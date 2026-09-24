<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Post bodies used to be stored as Markdown and rendered on read.
     * The rich text editor produces HTML, so the stored form is now HTML.
     * Convert anything still written as Markdown.
     */
    public function up(): void
    {
        DB::table('posts')
            ->select('id', 'body')
            ->orderBy('id')
            ->chunk(100, function ($posts) {
                foreach ($posts as $post) {
                    $body = (string) $post->body;

                    if ($body === '' || $this->looksLikeHtml($body)) {
                        continue;
                    }

                    DB::table('posts')
                        ->where('id', $post->id)
                        ->update(['body' => Str::markdown($body)]);
                }
            });
    }

    public function down(): void
    {
        // Converting HTML back to Markdown would be lossy, so this is a
        // one-way migration by design.
    }

    protected function looksLikeHtml(string $body): bool
    {
        return (bool) preg_match('/<(p|h[1-6]|ul|ol|blockquote|pre|figure|div)\b/i', $body);
    }
};
