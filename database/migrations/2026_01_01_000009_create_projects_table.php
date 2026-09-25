<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('admin_id')->nullable()->constrained('admins')->nullOnDelete();

            $table->string('title');
            $table->string('slug')->unique();
            $table->string('client')->nullable();
            $table->string('sector')->nullable();      // "Web App", "E-commerce", ...
            $table->string('year')->nullable();
            $table->text('summary')->nullable();
            $table->longText('body')->nullable();      // Case study, HTML from the editor

            // Card media: a poster image, optionally with a video that
            // plays on hover. Either an uploaded file or an external URL.
            $table->string('cover_image')->nullable();
            $table->string('cover_alt')->nullable();
            $table->string('video_path')->nullable();
            $table->string('video_url')->nullable();

            $table->json('tech')->nullable();          // ["Laravel", "React", ...]

            $table->string('live_url')->nullable();
            // Whether a card opens the case study or jumps straight to the
            // live site. "auto" picks the case study when one exists.
            $table->string('link_mode')->default('auto'); // auto | detail | external

            $table->string('status')->default('draft');   // draft | published
            $table->boolean('is_featured')->default(false);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamp('published_at')->nullable();

            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();

            $table->timestamps();

            $table->index(['status', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
