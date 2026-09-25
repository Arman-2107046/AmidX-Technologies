<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('job_openings', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('team')->nullable();          // Engineering, Design, ...
            $table->string('location')->nullable();
            $table->string('employment_type')->nullable(); // Full-time, Contract
            $table->string('experience')->nullable();
            $table->text('summary')->nullable();
            $table->longText('body')->nullable();        // HTML from the editor
            $table->string('apply_email')->nullable();
            $table->string('apply_url')->nullable();
            $table->boolean('is_open')->default(true);
            $table->string('status')->default('draft');  // draft | published
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->index(['status', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('job_openings');
    }
};
