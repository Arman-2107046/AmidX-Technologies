<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use App\Models\JobOpening;
use App\Models\Page;
use App\Models\Post;
use App\Models\Project;
use App\Support\Cms;
use Illuminate\Http\Response as HttpResponse;
use Inertia\Inertia;
use Inertia\Response;

class SitemapController extends Controller
{
    /**
     * Human-readable sitemap, built from what is actually published rather
     * than a hand-maintained list, so it cannot drift out of date.
     */
    public function index(): Response
    {
        return Inertia::render('Sitemap', [
            ...Cms::payload('sitemap'),
            'sections' => $this->sections(),
        ]);
    }

    /**
     * XML sitemap for crawlers.
     */
    public function xml(): HttpResponse
    {
        $urls = [];

        foreach ($this->sections() as $section) {
            foreach ($section['links'] as $link) {
                $urls[] = [
                    'loc' => url($link['href']),
                    'lastmod' => $link['updated_at'] ?? null,
                    'priority' => $link['priority'] ?? '0.6',
                ];
            }
        }

        $xml = view('sitemap', ['urls' => $urls])->render();

        return response($xml, 200, [
            'Content-Type' => 'application/xml; charset=UTF-8',
        ]);
    }

    /**
     * Every public URL, grouped for display.
     *
     * @return array<int, array<string, mixed>>
     */
    protected function sections(): array
    {
        $staticPages = [
            ['label' => 'Home', 'href' => '/', 'priority' => '1.0'],
            ['label' => 'Solutions', 'href' => '/solutions', 'priority' => '0.9'],
            ['label' => 'Portfolio', 'href' => '/portfolio', 'priority' => '0.9'],
            ['label' => 'Pricing', 'href' => '/pricing', 'priority' => '0.8'],
            ['label' => 'About', 'href' => '/about', 'priority' => '0.8'],
            ['label' => 'Clients', 'href' => '/clients', 'priority' => '0.8'],
            ['label' => 'Technologies', 'href' => '/technologies', 'priority' => '0.7'],
            ['label' => 'Blog', 'href' => '/blog', 'priority' => '0.8'],
            ['label' => 'FAQ', 'href' => '/faq', 'priority' => '0.7'],
            ['label' => 'Careers', 'href' => '/careers', 'priority' => '0.7'],
            ['label' => 'Contact', 'href' => '/contact', 'priority' => '0.8'],
        ];

        // Drop anything an admin has unpublished in the CMS.
        $unpublished = Page::where('is_published', false)->pluck('route')->all();
        $staticPages = array_values(array_filter(
            $staticPages,
            fn ($p) => ! in_array($p['href'], $unpublished, true)
        ));

        $legal = [
            ['label' => 'Privacy Policy', 'href' => '/privacy', 'priority' => '0.3'],
            ['label' => 'Terms of Service', 'href' => '/service', 'priority' => '0.3'],
            ['label' => 'Cookie Policy', 'href' => '/cookies', 'priority' => '0.3'],
            ['label' => 'Sitemap', 'href' => '/sitemap', 'priority' => '0.3'],
        ];

        return array_values(array_filter([
            [
                'title' => 'Pages',
                'links' => $staticPages,
            ],
            [
                'title' => 'Work',
                'links' => Project::published()
                    ->orderBy('sort_order')
                    ->get()
                    ->map(fn (Project $p) => [
                        'label' => $p->title,
                        'href' => "/portfolio/{$p->slug}",
                        'meta' => $p->sector,
                        'updated_at' => $p->updated_at?->toAtomString(),
                        'priority' => '0.7',
                    ])->all(),
            ],
            [
                'title' => 'Articles',
                'links' => Post::published()
                    ->latest('published_at')
                    ->get()
                    ->map(fn (Post $p) => [
                        'label' => $p->title,
                        'href' => "/blog/{$p->slug}",
                        'meta' => $p->published_at?->format('M Y'),
                        'updated_at' => $p->updated_at?->toAtomString(),
                        'priority' => '0.6',
                    ])->all(),
            ],
            [
                'title' => 'Open roles',
                'links' => JobOpening::published()
                    ->where('is_open', true)
                    ->orderBy('sort_order')
                    ->get()
                    ->map(fn (JobOpening $j) => [
                        'label' => $j->title,
                        'href' => "/careers/{$j->slug}",
                        'meta' => $j->location,
                        'updated_at' => $j->updated_at?->toAtomString(),
                        'priority' => '0.5',
                    ])->all(),
            ],
            [
                'title' => 'Legal',
                'links' => $legal,
            ],
        ], fn ($section) => count($section['links']) > 0));
    }

    /** Used by the FAQ page's structured data count. */
    public static function faqCount(): int
    {
        return Faq::published()->count();
    }
}
