<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
        'available',
        'stock',
    ];

    public function loan()
    {
        return $this->morphOne('Loan', 'object');
    }
}