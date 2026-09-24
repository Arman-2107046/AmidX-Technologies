<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('content_blocks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('page_id')->constrained('pages')->cascadeOnDelete();
            $table->string('section')->default('general'); // Groups fields in the UI
            $table->string('key');                          // e.g. hero.title
            $table->string('label');                        // Shown to the editor
            $table->string('type')->default('text');        // text|textarea|html|image|list
            $table->longText('value')->nullable();          // list/json stored encoded
            $table->text('help')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->unique(['page_id', 'key']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('content_blocks');
    }
};
