<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ContentBlock extends Model
{
    use HasFactory;

    protected $fillable = [
        'page_id',
        'section',
        'key',
        'label',
        'type',
        'value',
        'help',
        'sort_order',
    ];

    public function page(): BelongsTo
    {
        return $this->belongsTo(Page::class);
    }

    /**
     * "list" blocks hold JSON; everything else is a plain string.
     */
    public function resolvedValue(): mixed
    {
        if ($this->type !== 'list') {
            return $this->value;
        }

        return json_decode((string) $this->value, true) ?: [];
    }
}
