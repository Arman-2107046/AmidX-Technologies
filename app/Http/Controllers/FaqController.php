<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use App\Support\Cms;
use Inertia\Inertia;
use Inertia\Response;

class FaqController extends Controller
{
    public function index(): Response
    {
        $faqs = Faq::published()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get(['id', 'question', 'answer', 'group']);

        return Inertia::render('Faq', [
            ...Cms::payload('faq'),
            // Grouped so the page can render one column per topic.
            'groups' => $faqs->groupBy('group')->map->values(),
        ]);
    }
}
