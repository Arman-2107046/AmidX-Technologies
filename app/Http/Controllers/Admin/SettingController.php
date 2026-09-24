<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Support\Cms;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Settings', [
            'groups' => Setting::orderBy('group')
                ->orderBy('sort_order')
                ->get(['id', 'group', 'key', 'label', 'type', 'value'])
                ->groupBy('group'),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'settings' => ['array'],
            'settings.*' => ['nullable', 'string'],
        ]);

        foreach ($validated['settings'] ?? [] as $id => $value) {
            Setting::whereKey($id)->update(['value' => $value]);
        }

        Cms::flush();

        return back()->with('success', 'Settings saved.');
    }
}
