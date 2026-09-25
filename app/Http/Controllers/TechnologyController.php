<?php

namespace App\Http\Controllers;

use App\Models\Technology;
use App\Support\Cms;
use Inertia\Inertia;
use Inertia\Response;

class TechnologyController extends Controller
{
    public function index(): Response
    {
        $tech = Technology::published()
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        return Inertia::render('Technologies', [
            ...Cms::payload('technologies'),
            // Grouped by category so the page reads as a stack, not a list.
            'categories' => $tech->groupBy('category')->map(
                fn ($group) => $group->map(fn (Technology $t) => [
                    'id' => $t->id,
                    'name' => $t->name,
                    'description' => $t->description,
                    'rationale' => $t->rationale,
                    'logo_url' => $t->logoUrl(),
                    'logo_alt' => $t->logo_alt ?? $t->name,
                    'website' => $t->website,
                    'is_core' => $t->is_core,
                ])->values()
            ),
            'core' => $tech->where('is_core', true)->pluck('name')->values(),
            'total' => $tech->count(),
        ]);
    }
}
