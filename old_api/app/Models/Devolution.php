<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Devolution extends Model
{
    
    public function loan()
    {
        return $this->belongsTo(Loan::class);
    }
}
