<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('technologies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('category')->default('Other'); // Frontend, Backend, Cloud, Data...
            $table->text('description')->nullable();
            $table->string('logo')->nullable();
            $table->string('logo_alt')->nullable();
            $table->string('website')->nullable();

            // Why we reach for it, shown on hover/expand.
            $table->text('rationale')->nullable();

            $table->boolean('is_core')->default(false);   // Headline stack
            $table->string('status')->default('published');
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->index(['status', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('technologies');
    }
};
