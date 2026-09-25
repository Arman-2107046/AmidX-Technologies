<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'admin_id',
        'title',
        'slug',
        'client',
        'sector',
        'year',
        'summary',
        'body',
        'cover_image',
        'cover_alt',
        'video_path',
        'video_url',
        'tech',
        'live_url',
        'link_mode',
        'status',
        'is_featured',
        'sort_order',
        'published_at',
        'meta_title',
        'meta_description',
    ];

    protected function casts(): array
    {
        return [
            'tech' => 'array',
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

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', 'published');
    }

    /** A case study exists only when there is body content to show. */
    public function hasCaseStudy(): bool
    {
        return filled(trim(strip_tags((string) $this->body)));
    }

    /**
     * Where a card should send the visitor.
     *
     * "auto" prefers the case study and falls back to the live site, so a
     * project never links nowhere just because its body is still empty.
     */
    public function resolvedUrl(): ?string
    {
        $detail = "/portfolio/{$this->slug}";

        return match ($this->link_mode) {
            'detail' => $detail,
            'external' => $this->live_url ?: $detail,
            default => $this->hasCaseStudy() ? $detail : ($this->live_url ?: $detail),
        };
    }

    /** True when a card should open in a new tab. */
    public function opensExternally(): bool
    {
        $url = $this->resolvedUrl();

        return $url !== null && ! str_starts_with($url, '/');
    }

    public function videoSrc(): ?string
    {
        if ($this->video_path) {
            return Storage::url($this->video_path);
        }

        return $this->video_url ?: null;
    }

    public function coverUrl(): ?string
    {
        return $this->cover_image ? Storage::url($this->cover_image) : null;
    }

    public static function uniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $base = Str::slug($title) ?: 'project';
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
