<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class JobOpening extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'team',
        'location',
        'employment_type',
        'experience',
        'summary',
        'body',
        'apply_email',
        'apply_url',
        'is_open',
        'status',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'is_open' => 'boolean',
        ];
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', 'published');
    }

    /**
     * Where an application should go. Falls back to the site contact
     * address so a role is never a dead end.
     */
    public function applyLink(?string $fallbackEmail = null): ?string
    {
        if ($this->apply_url) {
            return $this->apply_url;
        }

        $email = $this->apply_email ?: $fallbackEmail;

        return $email
            ? 'mailto:'.$email.'?subject='.rawurlencode("Application: {$this->title}")
            : null;
    }

    public static function uniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $base = Str::slug($title) ?: 'role';
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
