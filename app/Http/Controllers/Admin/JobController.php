<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JobOpening;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class JobController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Jobs/Index', [
            'jobs' => JobOpening::orderBy('sort_order')->latest('created_at')->get(),
            'counts' => [
                'all' => JobOpening::count(),
                'open' => JobOpening::where('status', 'published')->where('is_open', true)->count(),
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Jobs/Edit', ['job' => null]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);

        $job = new JobOpening($data);
        $job->slug = JobOpening::uniqueSlug($data['slug'] ?: $data['title']);
        $job->save();

        return redirect()
            ->route('admin.jobs.edit', $job)
            ->with('success', "“{$job->title}” created.");
    }

    public function edit(JobOpening $job): Response
    {
        return Inertia::render('Admin/Jobs/Edit', [
            'job' => [
                ...$job->toArray(),
                'permalink' => "/careers/{$job->slug}",
            ],
        ]);
    }

    public function update(Request $request, JobOpening $job): RedirectResponse
    {
        $data = $this->validated($request);

        $job->fill($data);
        $job->slug = JobOpening::uniqueSlug($data['slug'] ?: $data['title'], $job->id);
        $job->save();

        return back()->with('success', "“{$job->title}” saved.");
    }

    public function destroy(JobOpening $job): RedirectResponse
    {
        $title = $job->title;
        $job->delete();

        return redirect()
            ->route('admin.jobs.index')
            ->with('success', "“{$title}” deleted.");
    }

    /** @return array<string, mixed> */
    protected function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'team' => ['nullable', 'string', 'max:100'],
            'location' => ['nullable', 'string', 'max:255'],
            'employment_type' => ['nullable', 'string', 'max:100'],
            'experience' => ['nullable', 'string', 'max:100'],
            'summary' => ['nullable', 'string', 'max:600'],
            'body' => ['nullable', 'string'],
            'apply_email' => ['nullable', 'email', 'max:255'],
            'apply_url' => ['nullable', 'url', 'max:2048'],
            'is_open' => ['boolean'],
            'status' => ['required', 'in:draft,published'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);
    }
}
