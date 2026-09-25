<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Support\Cms;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    public function index(Request $request): Response
    {
        $sector = $request->string('sector')->toString();

        $projects = Project::published()
            ->when($sector, fn ($q) => $q->where('sector', $sector))
            ->orderByDesc('is_featured')
            ->orderBy('sort_order')
            ->latest('published_at')
            ->get()
            ->map(fn (Project $p) => $this->card($p));

        return Inertia::render('Portfolio/Index', [
            ...Cms::payload('portfolio'),
            'projects' => $projects,
            'sectors' => Project::published()
                ->whereNotNull('sector')
                ->distinct()
                ->orderBy('sector')
                ->pluck('sector'),
            'filters' => ['sector' => $sector ?: null],
        ]);
    }

    public function show(string $slug): Response
    {
        $project = Project::published()
            ->with('author:id,name')
            ->where('slug', $slug)
            ->firstOrFail();

        $more = Project::published()
            ->whereKeyNot($project->id)
            ->when($project->sector, fn ($q) => $q->where('sector', $project->sector))
            ->orderBy('sort_order')
            ->take(3)
            ->get()
            ->map(fn (Project $p) => $this->card($p));

        // Backfill so the section is never half-empty.
        if ($more->count() < 3) {
            $more = $more->concat(
                Project::published()
                    ->whereKeyNot($project->id)
                    ->whereNotIn('id', $more->pluck('id'))
                    ->orderBy('sort_order')
                    ->take(3 - $more->count())
                    ->get()
                    ->map(fn (Project $p) => $this->card($p))
            );
        }

        return Inertia::render('Portfolio/Show', [
            'project' => [
                ...$this->card($project),
                'html' => (string) ($project->body ?? ''),
                'meta_title' => $project->meta_title,
                'meta_description' => $project->meta_description,
            ],
            'more' => $more->values(),
        ]);
    }

    /** @return array<string, mixed> */
    protected function card(Project $project): array
    {
        return [
            'id' => $project->id,
            'title' => $project->title,
            'slug' => $project->slug,
            'client' => $project->client,
            'sector' => $project->sector,
            'year' => $project->year,
            'summary' => $project->summary,
            'tech' => $project->tech ?? [],
            'cover_url' => $project->coverUrl(),
            'cover_alt' => $project->cover_alt ?? $project->title,
            'video_src' => $project->videoSrc(),
            'live_url' => $project->live_url,
            'url' => $project->resolvedUrl(),
            'external' => $project->opensExternally(),
            'detail_url' => "/portfolio/{$project->slug}",
            'has_case_study' => $project->hasCaseStudy(),
            'is_featured' => $project->is_featured,
        ];
    }
}
