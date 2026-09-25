<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Page extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'name',
        'route',
        'meta_title',
        'meta_description',
        'hero_image',
        'hero_image_alt',
        'is_published',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
        ];
    }

    public function blocks(): HasMany
    {
        return $this->hasMany(ContentBlock::class);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
