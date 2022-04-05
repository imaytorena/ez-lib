<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreModel\StoreLoanRequest;
use App\Models\Devolution;
use App\Services\LoanService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
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
     * Get all Loan.
     *
     * @return JsonResponse
     */
    public function index(Request $request, $paginate = true)
    {
        $loans = Loan::query();
        if ($paginate) {
            $loans = $loans->paginate(10);
        } else {
            $loans = $loans->get();
        }

        return response()->json(['loans' => $loans], 200);
    }

    /**
     * Store a new loan.
     *x
     * @param StoreLoanRequest $request
     * @return JsonResponse
     */
    public function create(StoreLoanRequest $request)
    {
        try {
            $data = $request->all();
            $loan = LoanService::create($data);

            return response()->json($loan, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    /**
     * Update a loan.
     *
     * @param Request $request
     * @param  $id
     * @return JsonResponse
     */
    public function update($id, Request $request)
    {
        try {
            // $loan = Loan::create($request->all());
            // $loan = Loan::findOrFail($id);

            // return response()->json(['loan' => $loan], 200);
            return response()->json(['loan' => "loan"], 200);

        } catch (\Exception $e) {

            return response()->json(['message' => 'loan not found!'], 404);
        }
    }

    /**
     * Delete a loan.
     *
     * @param  $id
     * @return JsonResponse
     */
    public function delete($id)
    {
        try {
            // $loan = Loan::create($request->all());
            $loan = Loan::find($id);

            return response()->json(['loan' => $loan], 200);

        } catch (\Exception $e) {

            return response()->json(['message' => 'loan not found!'], 404);
        }
    }

    /**
     * Get one loan.
     *
     * @param  $id
     * @return JsonResponse
     */
    public function getById($id)
    {
        try {
            $loan = Loan::findOrFail($id);

            return response()->json(['loan' => $loan], 200);

        } catch (\Exception $e) {

            return response()->json(['message' => 'loan not found!'], 404);
        }

    }
}
