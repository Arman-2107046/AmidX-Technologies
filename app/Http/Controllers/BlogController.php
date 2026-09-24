<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use App\Support\Cms;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function index(Request $request): Response
    {
        $categorySlug = $request->string('category')->toString();
        $search = $request->string('search')->toString();

        $query = Post::published()
            ->with(['author:id,name', 'categories:id,name,slug'])
            ->when($categorySlug, fn ($q) => $q->whereHas(
                'categories',
                fn ($c) => $c->where('slug', $categorySlug)
            ))
            ->when($search, fn ($q) => $q->where(fn ($w) => $w
                ->where('title', 'like', "%{$search}%")
                ->orWhere('excerpt', 'like', "%{$search}%")))
            ->latest('published_at');

        // The featured post only headlines the unfiltered listing, so a
        // filtered view never hides a matching post above the fold.
        $featured = null;
        if (! $categorySlug && ! $search) {
            $featured = Post::published()
                ->with(['author:id,name', 'categories:id,name,slug'])
                ->orderByDesc('is_featured')
                ->latest('published_at')
                ->first();

            if ($featured) {
                $query->whereKeyNot($featured->id);
            }
        }

        return Inertia::render('Blog/Index', [
            ...Cms::payload('blog'),
            'featured' => $featured ? $this->card($featured) : null,
            'posts' => $query->paginate(9)
                ->withQueryString()
                ->through(fn (Post $post) => $this->card($post)),
            'categories' => Category::has('posts')
                ->orderBy('name')
                ->get(['name', 'slug']),
            'filters' => [
                'category' => $categorySlug ?: null,
                'search' => $search ?: null,
            ],
        ]);
    }

    public function show(string $slug): Response
    {
        $post = Post::published()
            ->with(['author:id,name', 'categories:id,name,slug'])
            ->where('slug', $slug)
            ->firstOrFail();

        $post->increment('views');

        // Related posts share a category; fall back to the most recent.
        $categoryIds = $post->categories->pluck('id');

        $related = Post::published()
            ->with(['author:id,name', 'categories:id,name,slug'])
            ->whereKeyNot($post->id)
            ->when($categoryIds->isNotEmpty(), fn ($q) => $q->whereHas(
                'categories',
                fn ($c) => $c->whereIn('categories.id', $categoryIds)
            ))
            ->latest('published_at')
            ->take(3)
            ->get()
            ->map(fn (Post $p) => $this->card($p));

        if ($related->count() < 3) {
            $related = $related->concat(
                Post::published()
                    ->with(['author:id,name', 'categories:id,name,slug'])
                    ->whereKeyNot($post->id)
                    ->whereNotIn('id', $related->pluck('id'))
                    ->latest('published_at')
                    ->take(3 - $related->count())
                    ->get()
                    ->map(fn (Post $p) => $this->card($p))
            );
        }

        return Inertia::render('Blog/Show', [
            'post' => [
                ...$this->card($post),
                'html' => $post->renderedBody(),
                'meta_title' => $post->meta_title,
                'meta_description' => $post->meta_description,
                'views' => $post->views,
            ],
            'related' => $related->values(),
        ]);
    }

    /**
     * The shape every post listing uses.
     *
     * @return array<string, mixed>
     */
    protected function card(Post $post): array
    {
        return [
            'id' => $post->id,
            'title' => $post->title,
            'slug' => $post->slug,
            'excerpt' => $post->excerpt,
            'cover_url' => $post->cover_image ? Storage::url($post->cover_image) : null,
            'cover_alt' => $post->cover_alt ?? $post->title,
            'reading_minutes' => $post->reading_minutes,
            'published_at' => $post->published_at?->toIso8601String(),
            'published_label' => $post->published_at?->format('j M Y'),
            'author' => $post->author?->name,
            'categories' => $post->categories->map->only(['name', 'slug']),
            'url' => "/blog/{$post->slug}",
        ];
    }
}
