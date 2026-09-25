<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Support\Cms;
use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
{
    public function index(): Response
    {
        $clients = Client::published()
            ->with('project:id,slug,title')
            ->orderByDesc('is_featured')
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        return Inertia::render('Clients', [
            ...Cms::payload('clients'),
            'clients' => $clients->map(fn (Client $c) => [
                'id' => $c->id,
                'name' => $c->name,
                'industry' => $c->industry,
                'location' => $c->location,
                'since' => $c->since,
                'summary' => $c->summary,
                'logo_url' => $c->logoUrl(),
                'logo_alt' => $c->logo_alt ?? $c->name,
                'website' => $c->website,
                'is_featured' => $c->is_featured,
                'project_url' => $c->project ? "/portfolio/{$c->project->slug}" : null,
                'project_title' => $c->project?->title,
            ]),
            // Quotes are pulled out separately so the page can lead with
            // them rather than burying them inside the logo wall.
            'quotes' => $clients->filter->hasQuote()->map(fn (Client $c) => [
                'id' => $c->id,
                'quote' => $c->quote,
                'author' => $c->quote_author,
                'role' => $c->quote_role,
                'name' => $c->name,
                'logo_url' => $c->logoUrl(),
            ])->values(),
            'industries' => $clients->pluck('industry')->filter()->unique()->sort()->values(),
        ]);
    }
}
