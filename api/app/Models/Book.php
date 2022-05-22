<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'autor',
        'publisher',
        'isbn',
        'year',
        'genre',
        'image_url',
        'available',
        'stock',
    ];

    public function copies(): HasMany
    {
        return $this->hasMany(BookCopy::class, 'book_id', 'id');
    }
}