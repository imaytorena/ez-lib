<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Devolution extends Model
{
    protected $fillable = [
        'loan_id',
        'return_date',
        'status_snapshot',
        'active',
    ];
    protected $hidden = [
        'loan_id',
        'status_snapshot',
    ];
    public function loan()
    {
        return $this->belongsTo(Loan::class);
    }
}
