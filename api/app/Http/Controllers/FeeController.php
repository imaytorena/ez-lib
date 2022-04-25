<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\JsonResponse;

use App\Models\Fee;
use Illuminate\Http\Request;

class FeeController extends Controller
{
    /**
     * Instantiate a new FeeController instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }

    /**
     * Get all Fees on a datatable format.
     *
     * @param Request $request
     * @return JsonResponse
     * @noinspection PhpUnusedParameterInspection
     */
    public function index(Request $request): JsonResponse
    {
        $fees = Fee::query();
        $fees = $fees->paginate(10);

        return response()->json($fees);
    }

    /**
     * Get all Fees.
     *
     * @return JsonResponse
     */
    public function all(): JsonResponse
    {
        $fees = Fee::query();
        $fees = $fees->get();

        return response()->json($fees);
    }

    /**
     * Store a new fee.
     *x
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request): JsonResponse
    {
        try {
            $fee = Fee::query()->create($request->all());

            return response()->json(['fee' => $fee], 201);
        } catch (Exception $e) {
            return response()->json(['message' => 'Hubo un error al crear el fee', 'error' => $e->getMessage()], 400);
        }
    }

    /**
     * Update a fee.
     *
     * @param int $id
     * @param Request $request
     * @return JsonResponse
     */
    public function update(int $id, Request $request): JsonResponse
    {
        try {
            $fee = Fee::query()->findOrFail($id);
            $fee->fill($request->all());
            $fee->save();

            return response()->json(['fee' => $fee]);
        } catch (Exception $e) {
            return response()->json(['message' => 'Hubo un error al actualizar el fee', 'error' => $e->getMessage()], 400);
        }
    }


    /**
     * Delete a fee.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function delete(int $id): JsonResponse
    {
        try {
            $fee = Fee::query()->findOrFail($id);
            $fee->delete();

            return response()->json(['fee' => $fee, 'message' => 'Fee eliminado exitosamente']);
        } catch (Exception $e) {
            return response()->json(['message' => 'Hubo un error al eliminar el fee', 'error' => $e->getMessage()], 400);
        }
    }

    /**
     * Get one fee.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function getById(int $id): JsonResponse
    {
        try {
            $fee = Fee::query()->findOrFail($id);
            return response()->json(['fee' => $fee]);
        } catch (Exception $e) {
            return response()->json(['message' => 'No se pudo encontrar el fee', 'error' => $e->getMessage()], 404);
        }
    }
}
