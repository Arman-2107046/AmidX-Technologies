<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(Request $request): Response
    {
        $projects = Project::query()
            ->when($request->string('search')->toString(), fn ($q, $term) => $q
                ->where(fn ($w) => $w
                    ->where('title', 'like', "%{$term}%")
                    ->orWhere('client', 'like', "%{$term}%")))
            ->when($request->string('status')->toString(), fn ($q, $status) => $q
                ->where('status', $status))
            ->orderBy('sort_order')
            ->latest('created_at')
            ->paginate(12)
            ->withQueryString()
            ->through(fn (Project $p) => [
                ...$p->only([
                    'id', 'title', 'slug', 'client', 'sector', 'year',
                    'status', 'is_featured', 'sort_order', 'live_url',
                ]),
                'cover_url' => $p->coverUrl(),
                'has_video' => (bool) $p->videoSrc(),
            ]);

        return Inertia::render('Admin/Projects/Index', [
            'projects' => $projects,
            'filters' => $request->only('search', 'status'),
            'counts' => [
                'all' => Project::count(),
                'published' => Project::where('status', 'published')->count(),
                'draft' => Project::where('status', 'draft')->count(),
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Projects/Edit', [
            'project' => null,
            'sectors' => $this->sectors(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);

        $project = new Project($this->fillable($data));
        $project->slug = Project::uniqueSlug($data['slug'] ?: $data['title']);
        $project->admin_id = Auth::guard('admin')->id();
        $project->cover_image = $this->storeFile($request, 'cover', 'projects', null);
        $project->video_path = $this->storeFile($request, 'video', 'projects/video', null);
        $project->published_at = $data['status'] === 'published' ? now() : null;
        $project->save();

        return redirect()
            ->route('admin.projects.edit', $project)
            ->with('success', "“{$project->title}” created.");
    }

    public function edit(Project $project): Response
    {
        return Inertia::render('Admin/Projects/Edit', [
            'project' => [
                ...$project->only([
                    'id', 'title', 'slug', 'client', 'sector', 'year',
                    'summary', 'body', 'cover_alt', 'video_url', 'live_url',
                    'link_mode', 'status', 'is_featured', 'sort_order',
                    'meta_title', 'meta_description',
                ]),
                'tech' => $project->tech ?? [],
                'cover_url' => $project->coverUrl(),
                'video_src' => $project->videoSrc(),
                'has_upload' => (bool) $project->video_path,
                'permalink' => "/portfolio/{$project->slug}",
            ],
            'sectors' => $this->sectors(),
        ]);
    }

    public function update(Request $request, Project $project): RedirectResponse
    {
        $data = $this->validated($request);

        $project->fill($this->fillable($data));
        $project->slug = Project::uniqueSlug($data['slug'] ?: $data['title'], $project->id);

        if ($cover = $this->storeFile($request, 'cover', 'projects', $project->cover_image)) {
            $project->cover_image = $cover;
        }

        if ($video = $this->storeFile($request, 'video', 'projects/video', $project->video_path)) {
            $project->video_path = $video;
        }

        if ($request->boolean('remove_video') && $project->video_path) {
            Storage::disk('public')->delete($project->video_path);
            $project->video_path = null;
        }

        if ($data['status'] === 'published' && ! $project->published_at) {
            $project->published_at = now();
        }

        $project->save();

        return back()->with('success', "“{$project->title}” saved.");
    }

    public function destroy(Project $project): RedirectResponse
    {
        foreach ([$project->cover_image, $project->video_path] as $path) {
            if ($path) {
                Storage::disk('public')->delete($path);
            }
        }

        $title = $project->title;
        $project->delete();

        return redirect()
            ->route('admin.projects.index')
            ->with('success', "“{$title}” deleted.");
    }

    /** @return array<string, mixed> */
    protected function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'client' => ['nullable', 'string', 'max:255'],
            'sector' => ['nullable', 'string', 'max:255'],
            'year' => ['nullable', 'string', 'max:20'],
            'summary' => ['nullable', 'string', 'max:600'],
            'body' => ['nullable', 'string'],
            'cover_alt' => ['nullable', 'string', 'max:255'],
            'video_url' => ['nullable', 'url', 'max:2048'],
            'live_url' => ['nullable', 'url', 'max:2048'],
            'link_mode' => ['required', 'in:auto,detail,external'],
            'status' => ['required', 'in:draft,published'],
            'is_featured' => ['boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:500'],
            'tech' => ['array'],
            'tech.*' => ['string', 'max:60'],
            'cover' => ['nullable', 'image', 'max:6144'],
            'video' => ['nullable', 'file', 'mimetypes:video/mp4,video/webm', 'max:51200'],
            'remove_video' => ['boolean'],
        ]);
    }

    /** @return array<string, mixed> */
    protected function fillable(array $data): array
    {
        return collect($data)
            ->except(['cover', 'video', 'remove_video', 'slug'])
            ->put('sort_order', $data['sort_order'] ?? 0)
            ->all();
    }

    protected function storeFile(Request $request, string $field, string $dir, ?string $existing): ?string
    {
        if (! $request->hasFile($field)) {
            return null;
        }

        // Replace rather than accumulate orphaned uploads.
        if ($existing) {
            Storage::disk('public')->delete($existing);
        }

        return $request->file($field)->store($dir, 'public');
    }

    /** Existing sector values, offered as suggestions in the editor. */
    protected function sectors(): array
    {
        return Project::whereNotNull('sector')
            ->distinct()
            ->orderBy('sector')
            ->pluck('sector')
            ->all();
    }
}
