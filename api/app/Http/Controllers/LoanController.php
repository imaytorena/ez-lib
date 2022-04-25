<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use App\Services\LoanService;
use App\Http\Requests\Loan\StoreRequest;
use App\Models\Loan;

class LoanController extends Controller
{

    /**
     * Instantiate a new LoansController instance.
     *1
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }

    /**
     * Get all loans paginated by default.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $loans = LoanService::getLoansWithRelations();
        $loans = $loans->paginate(10);

        return response()->json($loans);
    }

    /**
     * Get all loans.
     *
     * @return JsonResponse
     */
    public function all(): JsonResponse
    {
        $loans = LoanService::getLoansWithRelations();
        $loans = $loans->get();

        return response()->json($loans);
    }

    /**
     * Store a new loan.
     *x
     * @param StoreRequest $request
     * @return JsonResponse
     */
    public function create(StoreRequest $request): JsonResponse
    {
        try {
            $data = $request->all();
            $loan = LoanService::create($data);

            return response()->json(['loan' => $loan, 'message' => 'Préstamo creado exitosamente'], 201);
        } catch (Exception $e) {
            return response()->json(['message' => 'Hubo un error al crear el préstamo', 'error' => $e->getMessage()], 400);
        }
    }

    /**
     * Update a loan.
     *
     * @param Request $request
     * @param  $id
     * @return JsonResponse
     */
    public function update($id, Request $request): JsonResponse
    {
        try {
            // $loan = Loan::create($request->all());
            // $loan = Loan::findOrFail($id);

            // return response()->json(['loan' => $loan], 200);
            return response()->json(['loan' => "loan"]);

        } catch (Exception $e) {

            return response()->json(['message' => 'Hubo un error al actualizar el libro', 'error' => $e->getMessage()], 400);
        }
    }

    /**
     * Delete a loan.
     *
     * @param  int $id
     * @return JsonResponse
     */
    public function delete(int $id): JsonResponse
    {
        try {
            $loan = Loan::query()->findOrFail($id);
            $loan->delete();

            return response()->json(['loan' => $loan, 'message' => 'Préstamo eliminado exitosamente']);
        } catch (Exception $e) {
            return response()->json(['message' => 'Hubo un error al eliminar el préstamo', 'error' => $e->getMessage()], 400);
        }
    }

    /**
     * Get one loan.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function getById(int $id): JsonResponse
    {
        try {
            $loan = Loan::query()->findOrFail($id);

            return response()->json(['loan' => $loan]);
        } catch (Exception $e) {
            return response()->json(['message' => 'No se pudo encontrar el préstamo', 'error' => $e->getMessage()], 404);
        }
    }
}
