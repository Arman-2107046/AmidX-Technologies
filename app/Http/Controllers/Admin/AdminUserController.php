<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class AdminUserController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Admins', [
            'admins' => Admin::orderBy('name')->get([
                'id', 'name', 'email', 'is_active', 'last_login_at', 'created_at',
            ]),
            'currentId' => Auth::guard('admin')->id(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('admins', 'email')],
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        Admin::create($validated);

        return back()->with('success', 'Administrator added.');
    }

    /**
     * Change the signed-in admin's own password.
     */
    public function updatePassword(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password:admin'],
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        Auth::guard('admin')->user()
            ->update(['password' => $validated['password']]);

        return back()->with('success', 'Password updated.');
    }

    public function destroy(Admin $admin): RedirectResponse
    {
        if ($admin->id === Auth::guard('admin')->id()) {
            return back()->withErrors(['admin' => 'You cannot delete your own account.']);
        }

        if (Admin::count() <= 1) {
            return back()->withErrors(['admin' => 'At least one administrator must remain.']);
        }

        $admin->delete();

        return back()->with('success', 'Administrator removed.');
    }
}
