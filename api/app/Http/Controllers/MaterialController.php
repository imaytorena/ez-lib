<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\JsonResponse;

use App\Http\Requests\Material\UpdateRequest;
use App\Http\Requests\Material\StoreRequest;
use App\Models\Material;

class MaterialController extends Controller
{
    /**
     * Instantiate a new MaterialController instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }

    /**
     * Get all Materials on a datatable format.
     *
     * @param bool $paginate
     * @return JsonResponse
     */
    public function index(bool $paginate=true): JsonResponse
    {
        $materials = Material::query();
        if ($paginate) {
            $materials = $materials->paginate(10);
        } else {
            $materials = $materials->get();
        }
        return response()->json($materials);
    }

    /**
     * Get all Material.
     *
     * @return JsonResponse
     */
    public function all(): JsonResponse
    {
        return $this->index(false);
    }

    /**
     * Store a new material.
     *x
     * @param StoreRequest $request
     * @return JsonResponse
     */
    public function create(StoreRequest $request): JsonResponse
    {
        try {
            $material = Material::query()->create($request->all());

            return response()->json(['material' => $material], 201);
        } catch (Exception $e) {
            return response()->json(['message' => 'Hubo un error al crear el material', 'error' => $e->getMessage()], 400);
        }
    }

    /**
     * Update a material.
     *
     * @param int $id
     * @param UpdateRequest $request
     * @return JsonResponse
     */
    public function update(int $id, UpdateRequest $request): JsonResponse
    {
        try {
            $material = Material::query()->findOrFail($id);
            $material->fill($request->all());
            $material->save();

            return response()->json(['material' => $material]);
        } catch (Exception $e) {
            return response()->json(['message' => 'Hubo un error al actualizar el material', 'error' => $e->getMessage()], 400);
        }
    }


    /**
     * Delete a material.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function delete(int $id): JsonResponse
    {
        try {
            $material = Material::query()->findOrFail($id);
            $material->delete();

            return response()->json(['material' => $material, 'message' => 'Material eliminado exitosamente']);
        } catch (Exception $e) {
            return response()->json(['message' => 'Hubo un error al eliminar el material', 'error' => $e->getMessage()], 400);
        }
    }

    /**
     * Get one material.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function getById(int $id): JsonResponse
    {
        try {
            $material = Material::query()->findOrFail($id);
            return response()->json(['material' => $material]);
        } catch (Exception $e) {
            return response()->json(['message' => 'No se pudo encontrar el material', 'error' => $e->getMessage()], 404);
        }
    }
}
