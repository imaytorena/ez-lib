<?php

namespace App\Exports;

use App\Models\BookCopy;
use Maatwebsite\Excel\Concerns\FromCollection;

class BookCopiesExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return BookCopy::all();
    }
}
