<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\JsonResponse;

use App\Models\Penalty;
use Illuminate\Http\Request;

class PenaltyController extends Controller
{
    /**
     * Instantiate a new PenaltyController instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }

    /**
     * Get all Penalties on a datatable format.
     *
     * @param Request $request
     * @return JsonResponse
     * @noinspection PhpUnusedParameterInspection
     */
    public function index(Request $request): JsonResponse
    {
        $penalties = Penalty::query();
        $penalties = $penalties->paginate(10);

        return response()->json($penalties);
    }

    /**
     * Get all Penalties.
     *
     * @return JsonResponse
     */
    public function all(): JsonResponse
    {
        $penalties = Penalty::query();
        $penalties = $penalties->get();

        return response()->json($penalties);
    }

    /**
     * Store a new penalty.
     *x
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request): JsonResponse
    {
        try {
            $penalty = Penalty::query()->create($request->all());

            return response()->json(['penalty' => $penalty], 201);
        } catch (Exception $e) {
            return response()->json(['message' => 'Hubo un error al crear el penalty', 'error' => $e->getMessage()], 400);
        }
    }

    /**
     * Update a penalty.
     *
     * @param int $id
     * @param Request $request
     * @return JsonResponse
     */
    public function update(int $id, Request $request): JsonResponse
    {
        try {
            $penalty = Penalty::query()->findOrFail($id);
            $penalty->fill($request->all());
            $penalty->save();

            return response()->json(['penalty' => $penalty]);
        } catch (Exception $e) {
            return response()->json(['message' => 'Hubo un error al actualizar el penalty', 'error' => $e->getMessage()], 400);
        }
    }


    /**
     * Delete a penalty.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function delete(int $id): JsonResponse
    {
        try {
            $penalty = Penalty::query()->findOrFail($id);
            $penalty->delete();

            return response()->json(['penalty' => $penalty, 'message' => 'Penalty eliminado exitosamente']);
        } catch (Exception $e) {
            return response()->json(['message' => 'Hubo un error al eliminar el penalty', 'error' => $e->getMessage()], 400);
        }
    }

    /**
     * Get one penalty.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function getById(int $id): JsonResponse
    {
        try {
            $penalty = Penalty::query()->findOrFail($id);
            return response()->json(['penalty' => $penalty]);
        } catch (Exception $e) {
            return response()->json(['message' => 'No se pudo encontrar el penalty', 'error' => $e->getMessage()], 404);
        }
    }
}
