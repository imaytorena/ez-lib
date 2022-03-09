<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
