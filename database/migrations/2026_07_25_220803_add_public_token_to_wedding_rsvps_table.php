<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('wedding_rsvps', function (Blueprint $table) {
            $table
                ->uuid('public_token')
                ->nullable()
                ->unique()
                ->after('id');
        });
    }

    public function down(): void
    {
        Schema::table('wedding_rsvps', function (Blueprint $table) {
            $table->dropUnique(
                'wedding_rsvps_public_token_unique'
            );

            $table->dropColumn('public_token');
        });
    }
};
