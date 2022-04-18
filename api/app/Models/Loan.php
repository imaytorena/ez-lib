<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\SoftDeletes;


class Loan extends Model
{
    use HasFactory, SoftDeletes;

    protected array $types = [
        'ejemplar' => 'App\Models\BookCopy',
        'material' => 'App\Models\Material',
    ];

    protected $fillable = [
        'user_id', 
        'object_type',
        'object_id', 
        'status',
        'details',
    ];
    
    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];
    
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function object(): MorphTo
    {
        return $this->morphTo();
    }
    
    public function devolutions(): HasMany
    {
        return $this->hasMany(Devolution::class);
    }
}
