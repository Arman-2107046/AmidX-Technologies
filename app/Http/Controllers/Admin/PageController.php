<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContentBlock;
use App\Models\Page;
use App\Support\Cms;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Pages/Index', [
            'pages' => Page::withCount('blocks')
                ->orderBy('sort_order')
                ->get(),
        ]);
    }

    public function edit(Page $page): Response
    {
        $blocks = $page->blocks()
            ->orderBy('section')
            ->orderBy('sort_order')
            ->get()
            ->map(fn (ContentBlock $block) => [
                'id' => $block->id,
                'section' => $block->section,
                'key' => $block->key,
                'label' => $block->label,
                'type' => $block->type,
                'value' => $block->value,
                'help' => $block->help,
            ]);

        return Inertia::render('Admin/Pages/Edit', [
            'page' => [
                ...$page->only([
                    'id', 'slug', 'name', 'route',
                    'meta_title', 'meta_description', 'is_published',
                    'hero_image_alt',
                ]),
                'hero_image_url' => $page->hero_image
                    ? Storage::url($page->hero_image)
                    : null,
            ],
            // Grouped so the editor can render one card per section.
            'sections' => $blocks->groupBy('section'),
        ]);
    }

    public function update(Request $request, Page $page): RedirectResponse
    {
        $validated = $request->validate([
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:1000'],
            'is_published' => ['boolean'],
            'hero_image' => ['nullable', 'image', 'max:6144'],
            'hero_image_alt' => ['nullable', 'string', 'max:255'],
            'remove_hero' => ['boolean'],
            'blocks' => ['array'],
            'blocks.*' => ['nullable', 'string'],
        ]);

        $page->fill([
            'meta_title' => $validated['meta_title'] ?? null,
            'meta_description' => $validated['meta_description'] ?? null,
            'is_published' => $validated['is_published'] ?? true,
            'hero_image_alt' => $validated['hero_image_alt'] ?? null,
        ]);

        if ($request->hasFile('hero_image')) {
            // Replace rather than accumulate orphaned uploads.
            if ($page->hero_image) {
                Storage::disk('public')->delete($page->hero_image);
            }
            $page->hero_image = $request->file('hero_image')->store('heroes', 'public');
        } elseif ($request->boolean('remove_hero') && $page->hero_image) {
            Storage::disk('public')->delete($page->hero_image);
            $page->hero_image = null;
        }

        $page->save();

        // blocks arrive keyed by block id.
        foreach ($validated['blocks'] ?? [] as $id => $value) {
            $page->blocks()
                ->whereKey($id)
                ->update(['value' => $value]);
        }

        Cms::flush($page->slug);

        return back()->with('success', "“{$page->name}” saved.");
    }
}
