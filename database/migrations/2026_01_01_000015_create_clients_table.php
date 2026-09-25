<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('industry')->nullable();
            $table->string('location')->nullable();
            $table->string('since')->nullable();          // "2023"
            $table->text('summary')->nullable();

            $table->string('logo')->nullable();
            $table->string('logo_alt')->nullable();
            $table->string('website')->nullable();

            // An optional quote, shown on the clients page.
            $table->text('quote')->nullable();
            $table->string('quote_author')->nullable();
            $table->string('quote_role')->nullable();

            // Optional link through to the case study.
            $table->foreignId('project_id')->nullable()
                ->constrained('projects')->nullOnDelete();

            $table->boolean('is_featured')->default(false);
            $table->string('status')->default('draft');   // draft | published
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->index(['status', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
