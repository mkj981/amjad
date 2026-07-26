<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class WeddingRsvp extends Model
{
    protected $fillable = [
        'name',
        'phone',
        'attendance',
        'guests',
        'message',
    ];

    protected function casts(): array
    {
        return [
            'guests' => 'integer',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (WeddingRsvp $weddingRsvp) {
            if (empty($weddingRsvp->public_token)) {
                $weddingRsvp->public_token = (string) Str::uuid();
            }
        });
    }

    public function getRouteKeyName(): string
    {
        return 'public_token';
    }
}
