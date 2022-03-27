<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Models\User;

class Loan extends Model
{
    use HasFactory, SoftDeletes;

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
