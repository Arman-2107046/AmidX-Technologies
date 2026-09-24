<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContentBlock;
use App\Models\Page;
use App\Models\Setting;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'pages' => Page::count(),
                'blocks' => ContentBlock::count(),
                'settings' => Setting::count(),
                'published' => Page::where('is_published', true)->count(),
            ],
            'pages' => Page::orderBy('sort_order')->get([
                'id', 'slug', 'name', 'route', 'is_published', 'updated_at',
            ]),
            'lastLogin' => Auth::guard('admin')->user()->last_login_at,
        ]);
    }
}
