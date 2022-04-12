<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\JsonResponse;

use App\Http\Requests\Book\UpdateRequest;
use App\Http\Requests\Book\StoreRequest;
//use App\Models\Book;
use App\Models\BookCopy;

class BookCopyController extends Controller
{
    /**
     * Instantiate a new BookController instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }

    /**
     * Get all copies on a datatable format.
     *
     * @param bool $paginate
     * @return JsonResponse
     */
    public function index(bool $paginate=true): JsonResponse
    {
        $copies = BookCopy::query();
        if ($paginate) {
            $copies = $copies->paginate(10);
        } else {
            $copies = $copies->get();
        }
        return response()->json($copies);
    }

    /**
     * Get all copies.
     *
     * @return JsonResponse
     */
    public function all(): JsonResponse
    {
        return $this->index(false);
    }

    /**
     * Store a new copy.
     *x
     * @param StoreRequest $request
     * @return JsonResponse
     */
    public function create(StoreRequest $request): JsonResponse
    {
        try {
            $copy = BookCopy::query()->create($request->all());

            return response()->json(['copy' => $copy, 'message' => 'Libro creado exitosamente'], 201);
        } catch (Exception $e) {
            return response()->json(['message' => 'Hubo un error al crear la copia', 'error' => $e->getMessage()], 400);
        }
    }

    /**
     * Update a copy.
     *
     * @param int $id
     * @param UpdateRequest $request
     * @return JsonResponse
     */
    public function update(int $id, UpdateRequest $request): JsonResponse
    {
        try {
            $copy = BookCopy::query()->findOrFail($id);
            $copy->fill($request->all());
            $copy->save();

            return response()->json(['copy' => $copy, 'message' => 'Libro editado exitosamente']);
        } catch (Exception $e) {
            return response()->json(['message' => 'Hubo un error al actualizar la copia', 'error' => $e->getMessage()], 400);
        }
    }


    /**
     * Delete a copy.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function delete(int $id): JsonResponse
    {
        try {
            $book = BookCopy::query()->findOrFail($id);
            $book->delete();

            return response()->json(['book' => $book, 'message' => 'Libro eliminado exitosamente']);
        } catch (Exception $e) {
            return response()->json(['message' => 'Hubo un error al eliminar la copia', 'error' => $e->getMessage()], 400);
        }
    }

    /**
     * Get one copy.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function getById(int $id): JsonResponse
    {
        try {
            $copy = BookCopy::query()->findOrFail($id);
            return response()->json(['copy' => $copy]);
        } catch (Exception $e) {
            return response()->json(['message' => 'No se pudo encontrar la copia', 'error' => $e->getMessage()], 404);
        }
    }
}
