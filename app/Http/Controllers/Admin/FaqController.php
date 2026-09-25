<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FaqController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Faqs/Index', [
            'faqs' => Faq::orderBy('group')
                ->orderBy('sort_order')
                ->get(),
            'groups' => Faq::distinct()->orderBy('group')->pluck('group'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Faqs/Edit', [
            'faq' => null,
            'groups' => Faq::distinct()->orderBy('group')->pluck('group'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Faq::create($this->validated($request));

        return redirect()
            ->route('admin.faqs.index')
            ->with('success', 'Question added.');
    }

    public function edit(Faq $faq): Response
    {
        return Inertia::render('Admin/Faqs/Edit', [
            'faq' => $faq,
            'groups' => Faq::distinct()->orderBy('group')->pluck('group'),
        ]);
    }

    public function update(Request $request, Faq $faq): RedirectResponse
    {
        $faq->update($this->validated($request));

        return back()->with('success', 'Question saved.');
    }

    public function destroy(Faq $faq): RedirectResponse
    {
        $faq->delete();

        return redirect()
            ->route('admin.faqs.index')
            ->with('success', 'Question removed.');
    }

    /** @return array<string, mixed> */
    protected function validated(Request $request): array
    {
        return $request->validate([
            'question' => ['required', 'string', 'max:500'],
            'answer' => ['nullable', 'string'],
            'group' => ['required', 'string', 'max:100'],
            'is_published' => ['boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);
    }
}
