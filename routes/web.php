<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\ProfileController;
use App\Support\Cms;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public marketing site
|--------------------------------------------------------------------------
|
| These mirror the routes the standalone AmidX React app declared in its
| App.tsx router. Each one renders the matching Inertia page, which wraps
| itself in PublicLayout (navbar, footer, cursor).
|
*/

Route::get('/', fn () => Inertia::render('Home', Cms::payload('home')))->name('home');
Route::get('/solutions', fn () => Inertia::render('Solutions', Cms::payload('solutions')))->name('solutions');
Route::get('/about', fn () => Inertia::render('About', Cms::payload('about')))->name('about');
Route::get('/contact', fn () => Inertia::render('Contact', Cms::payload('contact')))->name('contact');
Route::get('/pricing', fn () => Inertia::render('Pricing', Cms::payload('pricing')))->name('pricing');
Route::get('/privacy', fn () => Inertia::render('Privacy', Cms::payload('privacy')))->name('privacy');
Route::get('/service', fn () => Inertia::render('Service', Cms::payload('service')))->name('service');

// Blog
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');

// The original router mapped /services and /services/* to the same page.
Route::get('/services', fn () => Inertia::render('Solutions', Cms::payload('solutions')))->name('services');
Route::get('/services/{any}', fn () => Inertia::render('Solutions', Cms::payload('solutions')))->where('any', '.*');

/*
|--------------------------------------------------------------------------
| Authenticated area
|--------------------------------------------------------------------------
*/

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

/*
|--------------------------------------------------------------------------
| Catch-all
|--------------------------------------------------------------------------
|
| Stands in for the "*" route the original React router used to show the
| NotFound page. Registered last so it only runs when nothing else matched.
|
*/

Route::fallback(function () {
    return Inertia::render('NotFound')
        ->toResponse(request())
        ->setStatusCode(404);
});
