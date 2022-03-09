<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
        $loans = DB::table('loans')->leftjoin('users', 'loans.user_id', 'users.id')->get();
        
        return response()->json(['loans' =>  $loans], 200);
    }
}
