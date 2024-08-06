<?php

use App\Http\Controllers\SocialiteController;
use Illuminate\Support\Facades\Route;

Route::get('auth/redirect', [SocialiteController::class, 'redirect']);
Route::get('auth/callback', [SocialiteController::class, 'callback']);
Route::get('auth/local', [SocialiteController::class, 'localOnly']);

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/', function () {
        return view('dashboard');
    })->name('dashboard');
});
