<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Material extends Model
{
    use HasFactory;

    protected $fillable = [
        'serial_number',
        'option',
        'details',
        'brand',
        'model',
        'status',
    ];

    public function loan(): MorphOne
    {
        return $this->morphOne('Loan', 'object');
    }
}
