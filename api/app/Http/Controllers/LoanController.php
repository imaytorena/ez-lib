<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Loan;

class LoanController extends Controller
{
    // ->with('contenedor:id
    
     /**
     * Instantiate a new LoansController instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }

    /**
     * Get all Loans.
     *
     * @return Response
     */
    public function index()
    {
        $query = Loan::query();
        $results = $query
            ->with('user')
            ->get();

        $loans = [];
        $results->each( function ( $result ) use (&$loans) {
            $loan = [];
            $loan['id'] = $result['id'];
            $loan['username'] = $result['user']['username'];
            $loan['details'] = $result['details'];
            $loan['type'] = $result['object_type'] == "App\Models\Book" ? "book" : "material";

            array_push($loans, $loan);
        });
        
        return response()->json(['loans' =>  $loans], 200);
    }
}
