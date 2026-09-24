<?php

use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\SettingController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Admin panel + CMS
|--------------------------------------------------------------------------
|
| Everything here runs on the "admin" auth guard, backed by the `admins`
| table. It is deliberately independent of the "web" guard used by the
| public site's user accounts.
|
*/

Route::prefix('admin')->name('admin.')->group(function () {
    Route::middleware('admin.guest')->group(function () {
        Route::get('login', [AuthController::class, 'create'])->name('login');
        Route::post('login', [AuthController::class, 'store'])->name('login.store');
    });

    Route::middleware('admin.auth')->group(function () {
        Route::get('/', DashboardController::class)->name('dashboard');

        // CMS - pages and their content blocks
        Route::get('pages', [PageController::class, 'index'])->name('pages.index');
        Route::get('pages/{page}', [PageController::class, 'edit'])->name('pages.edit');
        Route::put('pages/{page}', [PageController::class, 'update'])->name('pages.update');

        // Blog
        Route::get('posts', [PostController::class, 'index'])->name('posts.index');
        Route::get('posts/create', [PostController::class, 'create'])->name('posts.create');
        Route::post('posts', [PostController::class, 'store'])->name('posts.store');
        Route::get('posts/{post}/edit', [PostController::class, 'edit'])->name('posts.edit');
        Route::post('posts/{post}', [PostController::class, 'update'])->name('posts.update');
        Route::delete('posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy');

        Route::get('categories', [CategoryController::class, 'index'])->name('categories.index');
        Route::post('categories', [CategoryController::class, 'store'])->name('categories.store');
        Route::put('categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
        Route::delete('categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');

        // Global site settings
        Route::get('settings', [SettingController::class, 'index'])->name('settings.index');
        Route::put('settings', [SettingController::class, 'update'])->name('settings.update');

        // Administrator accounts
        Route::get('admins', [AdminUserController::class, 'index'])->name('admins.index');
        Route::post('admins', [AdminUserController::class, 'store'])->name('admins.store');
        Route::delete('admins/{admin}', [AdminUserController::class, 'destroy'])->name('admins.destroy');
        Route::put('password', [AdminUserController::class, 'updatePassword'])->name('password.update');

        Route::post('logout', [AuthController::class, 'destroy'])->name('logout');
    });
});
