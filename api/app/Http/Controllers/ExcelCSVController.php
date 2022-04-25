<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Exports\UsersExport;
use App\Exports\BooksExport;
use App\Exports\BookCopiesExport;
use App\Exports\MaterialsExport;
use App\Exports\LoansExport;

use Maatwebsite\Excel\Facades\Excel;

use App\Models\User;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ExcelCSVController extends Controller
{
    /**
     * @param $model
     * @param $slug
     * @return BinaryFileResponse
     */
    public function export($model, $slug): BinaryFileResponse
    {
        return match ($model) {
            'books' => Excel::download(new BooksExport, "$model." . $slug),
            'copies' => Excel::download(new BookCopiesExport, "$model." . $slug),
            'materials' => Excel::download(new MaterialsExport, "$model." . $slug),
            'loans', 'penalties', 'fees' => Excel::download(new LoansExport, "$model." . $slug),
            default => Excel::download(new UsersExport, "$model." . $slug),
        };
    }

}