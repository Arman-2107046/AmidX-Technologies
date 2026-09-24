<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function index(Request $request): Response
    {
        $posts = Post::with('categories:id,name')
            ->when($request->string('search')->toString(), fn ($q, $term) => $q
                ->where(fn ($w) => $w
                    ->where('title', 'like', "%{$term}%")
                    ->orWhere('excerpt', 'like', "%{$term}%")))
            ->when($request->string('status')->toString(), fn ($q, $status) => $q
                ->where('status', $status))
            ->latest('created_at')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Posts/Index', [
            'posts' => $posts,
            'filters' => $request->only('search', 'status'),
            'counts' => [
                'all' => Post::count(),
                'published' => Post::where('status', 'published')->count(),
                'draft' => Post::where('status', 'draft')->count(),
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Posts/Edit', [
            'post' => null,
            'categories' => Category::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);

        $post = new Post($data);
        $post->slug = Post::uniqueSlug($data['slug'] ?: $data['title']);
        $post->admin_id = Auth::guard('admin')->id();
        $post->reading_minutes = Post::estimateReadingMinutes($data['body'] ?? '');
        $post->cover_image = $this->storeCover($request, null);
        $post->published_at = $this->resolvePublishedAt($data, null);
        $post->save();

        $post->categories()->sync($request->input('categories', []));

        return redirect()
            ->route('admin.posts.edit', $post)
            ->with('success', "“{$post->title}” created.");
    }

    public function edit(Post $post): Response
    {
        return Inertia::render('Admin/Posts/Edit', [
            'post' => [
                ...$post->only([
                    'id', 'title', 'slug', 'excerpt', 'body', 'cover_image',
                    'cover_alt', 'status', 'is_featured', 'reading_minutes',
                    'meta_title', 'meta_description',
                ]),
                'published_at' => $post->published_at?->format('Y-m-d\TH:i'),
                'cover_url' => $post->cover_image
                    ? Storage::url($post->cover_image)
                    : null,
                'categories' => $post->categories->pluck('id'),
                'permalink' => "/blog/{$post->slug}",
            ],
            'categories' => Category::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, Post $post): RedirectResponse
    {
        $data = $this->validated($request);

        $post->fill($data);
        $post->slug = Post::uniqueSlug($data['slug'] ?: $data['title'], $post->id);
        $post->reading_minutes = Post::estimateReadingMinutes($data['body'] ?? '');
        $post->published_at = $this->resolvePublishedAt($data, $post);

        if ($cover = $this->storeCover($request, $post)) {
            $post->cover_image = $cover;
        }

        $post->save();
        $post->categories()->sync($request->input('categories', []));

        return back()->with('success', "“{$post->title}” saved.");
    }

    public function destroy(Post $post): RedirectResponse
    {
        if ($post->cover_image) {
            Storage::disk('public')->delete($post->cover_image);
        }

        $title = $post->title;
        $post->delete();

        return redirect()
            ->route('admin.posts.index')
            ->with('success', "“{$title}” deleted.");
    }

    /**
     * @return array<string, mixed>
     */
    protected function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'excerpt' => ['nullable', 'string', 'max:500'],
            'body' => ['nullable', 'string'],
            'cover_alt' => ['nullable', 'string', 'max:255'],
            'status' => ['required', 'in:draft,published'],
            'is_featured' => ['boolean'],
            'published_at' => ['nullable', 'date'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:500'],
            'cover' => ['nullable', 'image', 'max:4096'],
            'categories' => ['array'],
            'categories.*' => ['integer', 'exists:categories,id'],
        ]);
    }

    /**
     * Publishing without an explicit date stamps "now"; the date is kept
     * once set so re-saving never moves a post's publication time.
     */
    protected function resolvePublishedAt(array $data, ?Post $post): ?string
    {
        if (! empty($data['published_at'])) {
            return $data['published_at'];
        }

        if ($data['status'] === 'published') {
            return $post?->published_at?->toDateTimeString() ?? now()->toDateTimeString();
        }

        return $post?->published_at?->toDateTimeString();
    }

    protected function storeCover(Request $request, ?Post $post): ?string
    {
        if (! $request->hasFile('cover')) {
            return null;
        }

        // Replace rather than accumulate orphaned uploads.
        if ($post?->cover_image) {
            Storage::disk('public')->delete($post->cover_image);
        }

        return $request->file('cover')->store('blog', 'public');
    }
}
