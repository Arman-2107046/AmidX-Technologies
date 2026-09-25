<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Technology;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class TechnologyController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Technologies/Index', [
            'technologies' => Technology::orderBy('category')
                ->orderBy('sort_order')
                ->orderBy('name')
                ->get()
                ->map(fn (Technology $t) => [
                    ...$t->only([
                        'id', 'name', 'slug', 'category', 'description',
                        'is_core', 'status', 'sort_order', 'website',
                    ]),
                    'logo_url' => $t->logoUrl(),
                ]),
            'categories' => $this->categories(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Technologies/Edit', [
            'technology' => null,
            'categories' => $this->categories(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);

        $tech = new Technology($this->fillable($data));
        $tech->slug = Technology::uniqueSlug($data['slug'] ?: $data['name']);
        $tech->logo = $this->storeLogo($request, null);
        $tech->save();

        return redirect()
            ->route('admin.technologies.index')
            ->with('success', "“{$tech->name}” added.");
    }

    public function edit(Technology $technology): Response
    {
        return Inertia::render('Admin/Technologies/Edit', [
            'technology' => [
                ...$technology->only([
                    'id', 'name', 'slug', 'category', 'description',
                    'logo_alt', 'website', 'rationale', 'is_core',
                    'status', 'sort_order',
                ]),
                'logo_url' => $technology->logoUrl(),
            ],
            'categories' => $this->categories(),
        ]);
    }

    public function update(Request $request, Technology $technology): RedirectResponse
    {
        $data = $this->validated($request);

        $technology->fill($this->fillable($data));
        $technology->slug = Technology::uniqueSlug(
            $data['slug'] ?: $data['name'],
            $technology->id
        );

        if ($logo = $this->storeLogo($request, $technology->logo)) {
            $technology->logo = $logo;
        }

        if ($request->boolean('remove_logo') && $technology->logo) {
            Storage::disk('public')->delete($technology->logo);
            $technology->logo = null;
        }

        $technology->save();

        return back()->with('success', "“{$technology->name}” saved.");
    }

    public function destroy(Technology $technology): RedirectResponse
    {
        if ($technology->logo) {
            Storage::disk('public')->delete($technology->logo);
        }

        $name = $technology->name;
        $technology->delete();

        return redirect()
            ->route('admin.technologies.index')
            ->with('success', "“{$name}” removed.");
    }

    /** @return array<string, mixed> */
    protected function validated(Request $request): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string', 'max:600'],
            'rationale' => ['nullable', 'string', 'max:600'],
            'logo_alt' => ['nullable', 'string', 'max:255'],
            'website' => ['nullable', 'url', 'max:2048'],
            'is_core' => ['boolean'],
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

        if ($existing) {
            Storage::disk('public')->delete($existing);
        }

        return $request->file('logo')->store('tech', 'public');
    }

    /**
     * Existing categories, offered as suggestions so the taxonomy stays
     * tidy without forcing a separate CRUD screen.
     *
     * @return array<int, string>
     */
    protected function categories(): array
    {
        return Technology::distinct()
            ->orderBy('category')
            ->pluck('category')
            ->all();
    }
}
