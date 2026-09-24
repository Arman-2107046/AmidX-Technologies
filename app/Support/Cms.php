<?php

namespace App\Support;

use App\Models\ContentBlock;
use App\Models\Page;
use App\Models\Setting;
use Illuminate\Support\Facades\Cache;

/**
 * Reads CMS content for the public site.
 *
 * Everything is cached and every lookup degrades gracefully: if a table is
 * missing or a key has no value, the page falls back to the default baked
 * into the React component. The public site therefore never depends on the
 * CMS being present.
 */
class Cms
{
    public const CACHE_TTL = 3600;

    /**
     * Content for one page, keyed by block key.
     *
     * @return array<string, mixed>
     */
    public static function content(string $slug): array
    {
        return Cache::remember("cms.page.{$slug}", self::CACHE_TTL, function () use ($slug) {
            try {
                $page = Page::where('slug', $slug)->first();

                if (! $page) {
                    return [];
                }

                return ContentBlock::where('page_id', $page->id)
                    ->get()
                    ->mapWithKeys(fn (ContentBlock $block) => [
                        $block->key => $block->resolvedValue(),
                    ])
                    ->all();
            } catch (\Throwable) {
                // CMS unavailable - the page renders its built-in defaults.
                return [];
            }
        });
    }

    /**
     * Page-level meta (title / description).
     *
     * @return array<string, mixed>
     */
    public static function meta(string $slug): array
    {
        return Cache::remember("cms.meta.{$slug}", self::CACHE_TTL, function () use ($slug) {
            try {
                $page = Page::where('slug', $slug)->first();

                return $page ? [
                    'title' => $page->meta_title,
                    'description' => $page->meta_description,
                ] : [];
            } catch (\Throwable) {
                return [];
            }
        });
    }

    /**
     * Global settings, keyed by setting key.
     *
     * @return array<string, mixed>
     */
    public static function settings(): array
    {
        return Cache::remember('cms.settings', self::CACHE_TTL, function () {
            try {
                return Setting::get()
                    ->mapWithKeys(fn (Setting $s) => [$s->key => $s->value])
                    ->all();
            } catch (\Throwable) {
                return [];
            }
        });
    }

    /**
     * The payload handed to an Inertia page.
     *
     * @return array<string, mixed>
     */
    public static function payload(string $slug): array
    {
        return [
            'content' => self::content($slug),
            'meta' => self::meta($slug),
        ];
    }

    /**
     * Drop cached content. Called whenever an admin saves.
     */
    public static function flush(?string $slug = null): void
    {
        if ($slug) {
            Cache::forget("cms.page.{$slug}");
            Cache::forget("cms.meta.{$slug}");
        } else {
            foreach (Page::pluck('slug') as $pageSlug) {
                Cache::forget("cms.page.{$pageSlug}");
                Cache::forget("cms.meta.{$pageSlug}");
            }
        }

        Cache::forget('cms.settings');
    }
}
