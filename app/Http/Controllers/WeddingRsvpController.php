<?php

namespace App\Http\Controllers;

use App\Models\WeddingRsvp;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class WeddingRsvpController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate(
            [
                'name' => [
                    'required',
                    'string',
                    'max:255',
                ],

                'phone' => [
                    'nullable',
                    'string',
                    'max:30',
                    'regex:/^[0-9+\-\s()]+$/',
                ],

                'attendance' => [
                    'required',
                    'in:yes,no',
                ],

                'guests' => [
                    'required',
                    'integer',
                    'between:1,4',
                ],

                'message' => [
                    'nullable',
                    'string',
                    'max:1000',
                ],
            ],
            [
                'name.required' => 'Please enter your full name.',

                'phone.regex' => 'Please enter a valid phone number.',

                'attendance.required' => 'Please select your attendance status.',
                'attendance.in' => 'The selected attendance status is invalid.',

                'guests.required' => 'Please select the number of guests.',
                'guests.integer' => 'The number of guests must be valid.',
                'guests.between' => 'The number of guests must be between 1 and 4.',
            ]
        );

        $weddingRsvp = WeddingRsvp::create($validated);

        return redirect()->route(
            'wedding.rsvp.thank-you',
            $weddingRsvp
        );
    }

    public function thankYou(WeddingRsvp $weddingRsvp): View
    {
        return view('rsvp-thank-you', [
            'weddingRsvp' => $weddingRsvp,
        ]);
    }
}
