<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Clients/Index', [
            'clients' => Client::orderBy('sort_order')
                ->orderBy('name')
                ->get()
                ->map(fn (Client $c) => [
                    ...$c->only([
                        'id', 'name', 'slug', 'industry', 'location',
                        'since', 'status', 'is_featured', 'sort_order', 'website',
                    ]),
                    'logo_url' => $c->logoUrl(),
                    'has_quote' => $c->hasQuote(),
                ]),
            'counts' => [
                'all' => Client::count(),
                'published' => Client::where('status', 'published')->count(),
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Clients/Edit', [
            'client' => null,
            'projects' => $this->projectOptions(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);

        $client = new Client($this->fillable($data));
        $client->slug = Client::uniqueSlug($data['slug'] ?: $data['name']);
        $client->logo = $this->storeLogo($request, null);
        $client->save();

        return redirect()
            ->route('admin.clients.edit', $client)
            ->with('success', "“{$client->name}” added.");
    }

    public function edit(Client $client): Response
    {
        return Inertia::render('Admin/Clients/Edit', [
            'client' => [
                ...$client->only([
                    'id', 'name', 'slug', 'industry', 'location', 'since',
                    'summary', 'logo_alt', 'website', 'quote', 'quote_author',
                    'quote_role', 'project_id', 'is_featured', 'status', 'sort_order',
                ]),
                'logo_url' => $client->logoUrl(),
            ],
            'projects' => $this->projectOptions(),
        ]);
    }

    public function update(Request $request, Client $client): RedirectResponse
    {
        $data = $this->validated($request);

        $client->fill($this->fillable($data));
        $client->slug = Client::uniqueSlug($data['slug'] ?: $data['name'], $client->id);

        if ($logo = $this->storeLogo($request, $client->logo)) {
            $client->logo = $logo;
        }

        if ($request->boolean('remove_logo') && $client->logo) {
            Storage::disk('public')->delete($client->logo);
            $client->logo = null;
        }

        $client->save();

        return back()->with('success', "“{$client->name}” saved.");
    }

    public function destroy(Client $client): RedirectResponse
    {
        if ($client->logo) {
            Storage::disk('public')->delete($client->logo);
        }

        $name = $client->name;
        $client->delete();

        return redirect()
            ->route('admin.clients.index')
            ->with('success', "“{$name}” removed.");
    }

    /** @return array<string, mixed> */
    protected function validated(Request $request): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'industry' => ['nullable', 'string', 'max:120'],
            'location' => ['nullable', 'string', 'max:255'],
            'since' => ['nullable', 'string', 'max:20'],
            'summary' => ['nullable', 'string', 'max:600'],
            'logo_alt' => ['nullable', 'string', 'max:255'],
            'website' => ['nullable', 'url', 'max:2048'],
            'quote' => ['nullable', 'string', 'max:800'],
            'quote_author' => ['nullable', 'string', 'max:255'],
            'quote_role' => ['nullable', 'string', 'max:255'],
            'project_id' => ['nullable', 'integer', 'exists:projects,id'],
            'is_featured' => ['boolean'],
            'status' => ['required', 'in:draft,published'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'logo' => ['nullable', 'image', 'max:2048'],
            'remove_logo' => ['boolean'],
        ]);
    }

    /** @return array<string, mixed> */
    protected function fillable(array $data): array
    {
        return collect($data)
            ->except(['logo', 'remove_logo', 'slug'])
            ->put('sort_order', $data['sort_order'] ?? 0)
            ->all();
    }

    protected function storeLogo(Request $request, ?string $existing): ?string
    {
        if (! $request->hasFile('logo')) {
            return null;
        }

        // Replace rather than accumulate orphaned uploads.
        if ($existing) {
            Storage::disk('public')->delete($existing);
        }

        return $request->file('logo')->store('clients', 'public');
    }

    /** @return array<int, array<string, mixed>> */
    protected function projectOptions(): array
    {
        return Project::orderBy('title')
            ->get(['id', 'title'])
            ->all();
    }
}
