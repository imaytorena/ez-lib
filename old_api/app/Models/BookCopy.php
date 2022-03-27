<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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

    public function book()
    {
        return $this->belongsTo(Book::class);
    }
    
    public function loan()
    {
        return $this->morphOne(Loan::class, 'object');
    }
}