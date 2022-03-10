<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Loan extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'status',
        'details',
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function object()
    {
        return $this->morphTo();
    }
    
    public function devolutions()
    {
        return $this->hasMany(Devolution::class);
    }
}
