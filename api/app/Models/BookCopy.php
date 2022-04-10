<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphOne;

use App\Models\Loan;

class BookCopy extends Model
{
    use HasFactory;

    protected $fillable = [
        'book_id',
        'folio',
        'name',
        'features'
    ];

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }

    public function loan(): MorphOne
    {
        return $this->morphOne(Loan::class, 'object');
    }
}
