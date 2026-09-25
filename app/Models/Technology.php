<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Technology extends Model
{
    use HasFactory;

    protected $table = 'technologies';

    protected $fillable = [
        'name', 'slug', 'category', 'description', 'logo', 'logo_alt',
        'website', 'rationale', 'is_core', 'status', 'sort_order',
    ];

    protected function casts(): array
    {
        return ['is_core' => 'boolean'];
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', 'published');
    }

    public function logoUrl(): ?string
    {
        return $this->logo ? Storage::url($this->logo) : null;
    }

    public static function uniqueSlug(string $name, ?int $ignoreId = null): string
    {
        $base = Str::slug($name) ?: 'technology';
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
