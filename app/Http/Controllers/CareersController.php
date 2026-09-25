<?php

namespace App\Http\Controllers;

use App\Models\JobOpening;
use App\Support\Cms;
use Inertia\Inertia;
use Inertia\Response;

class CareersController extends Controller
{
    public function index(): Response
    {
        $jobs = JobOpening::published()
            ->orderBy('sort_order')
            ->orderBy('title')
            ->get();

        return Inertia::render('Careers/Index', [
            ...Cms::payload('careers'),
            // Grouped by team, with closed roles kept out of the listing.
            'teams' => $jobs->where('is_open', true)
                ->groupBy(fn (JobOpening $j) => $j->team ?: 'Other')
                ->map(fn ($group) => $group->map(fn (JobOpening $j) => $this->card($j))->values()),
            'total' => $jobs->where('is_open', true)->count(),
        ]);
    }

    public function show(string $slug): Response
    {
        $job = JobOpening::published()->where('slug', $slug)->firstOrFail();

        $others = JobOpening::published()
            ->where('is_open', true)
            ->whereKeyNot($job->id)
            ->orderBy('sort_order')
            ->take(3)
            ->get()
            ->map(fn (JobOpening $j) => $this->card($j));

        $fallbackEmail = Cms::settings()['contact.email'] ?? null;

        return Inertia::render('Careers/Show', [
            'job' => [
                ...$this->card($job),
                'html' => (string) ($job->body ?? ''),
                'apply_link' => $job->applyLink($fallbackEmail),
            ],
            'others' => $others->values(),
        ]);
    }

    /** @return array<string, mixed> */
    protected function card(JobOpening $job): array
    {
        return [
            'id' => $job->id,
            'title' => $job->title,
            'slug' => $job->slug,
            'team' => $job->team,
            'location' => $job->location,
            'employment_type' => $job->employment_type,
            'experience' => $job->experience,
            'summary' => $job->summary,
            'is_open' => $job->is_open,
            'url' => "/careers/{$job->slug}",
        ];
    }
}
