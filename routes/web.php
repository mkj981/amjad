<?php

use App\Http\Controllers\WeddingRsvpController;
use Illuminate\Support\Facades\Route;

Route::view('/', 'wedding')->name('wedding');

Route::post('/rsvp', [WeddingRsvpController::class, 'store'])
    ->name('wedding.rsvp.store');

Route::get(
    '/rsvp/thank-you/{weddingRsvp}',
    [WeddingRsvpController::class, 'thankYou']
)->name('wedding.rsvp.thank-you');
