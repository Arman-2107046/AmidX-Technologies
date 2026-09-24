<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'admin_id',
        'title',
        'slug',
        'excerpt',
        'body',
        'cover_image',
        'cover_alt',
        'status',
        'is_featured',
        'published_at',
        'reading_minutes',
        'meta_title',
        'meta_description',
    ];

    protected function casts(): array
    {
        return [
            'is_featured' => 'boolean',
            'published_at' => 'datetime',
        ];
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(Admin::class, 'admin_id');
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class);
    }

    /**
     * Only posts that are published and whose publish date has arrived.
     * Scheduling a post for the future therefore hides it until then.
     */
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', 'published')
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }

    public function isPublished(): bool
    {
        return $this->status === 'published'
            && $this->published_at !== null
            && $this->published_at->lte(now());
    }

    /**
     * The post body, ready to render.
     *
     * Bodies are authored in the rich text editor and stored as HTML, so
     * this is a pass-through. Legacy Markdown rows were converted by the
     * 2026_01_01_000008 migration.
     */
    public function renderedBody(): string
    {
        return (string) ($this->body ?? '');
    }

    /**
     * Rough reading time, recalculated whenever the body changes.
     */
    public static function estimateReadingMinutes(?string $body): int
    {
        // Split on whitespace rather than str_word_count(), which is not
        // UTF-8 aware and undercounts accented or non-Latin text.
        $words = preg_split(
            '/\s+/u',
            trim(strip_tags((string) $body)),
            -1,
            PREG_SPLIT_NO_EMPTY
        );

        return max(1, (int) ceil(count($words ?: []) / 200));
    }

    /**
     * A unique slug, ignoring the post currently being edited.
     */
    public static function uniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $base = Str::slug($title) ?: 'post';
        $slug = $base;
        $i = 2;

        while (static::where('slug', $slug)
            ->when($ignoreId, fn ($q) => $q->whereKeyNot($ignoreId))
            ->exists()
        ) {
            $slug = "{$base}-{$i}";
            $i++;
        }

        return $slug;
    }
}
