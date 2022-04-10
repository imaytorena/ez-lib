<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\JsonResponse;

use App\Http\Requests\Book\UpdateRequest;
use App\Http\Requests\Book\StoreRequest;
use App\Models\Book;

class BookController extends Controller
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
     * Get all Books on a datatable format.
     *
     * @param bool $paginate
     * @return JsonResponse
     */
    public function index(bool $paginate=true): JsonResponse
    {
        $books = Book::query();
        if ($paginate) {
            $books = $books->paginate(10);
        } else {
            $books = $books->get();
        }
        return response()->json($books);
    }

    /**
     * Get all Book.
     *
     * @return JsonResponse
     */
    public function all(): JsonResponse
    {
        return $this->index(false);
    }

    /**
     * Store a new book.
     *x
     * @param StoreRequest $request
     * @return JsonResponse
     */
    public function create(StoreRequest $request): JsonResponse
    {
        try {
            $book = Book::query()->create($request->all());

            return response()->json(['book' => $book, 'message' => 'Libro creado exitosamente'], 201);
        } catch (Exception $e) {
            return response()->json(['message' => 'Hubo un error al crear el libro', 'error' => $e->getMessage()], 400);
        }
    }

    /**
     * Update a book.
     *
     * @param int $id
     * @param UpdateRequest $request
     * @return JsonResponse
     */
    public function update(int $id, UpdateRequest $request): JsonResponse
    {
        try {
            $book = Book::query()->findOrFail($id);
            $book->fill($request->all());
            $book->save();

            return response()->json(['book' => $book, 'message' => 'Libro editado exitosamente']);
        } catch (Exception $e) {
            return response()->json(['message' => 'Hubo un error al actualizar el libro', 'error' => $e->getMessage()], 400);
        }
    }


    /**
     * Delete a book.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function delete(int $id): JsonResponse
    {
        try {
            $book = Book::query()->findOrFail($id);
            $book->delete();

            return response()->json(['book' => $book, 'message' => 'Libro eliminado exitosamente']);
        } catch (Exception $e) {
            return response()->json(['message' => 'Hubo un error al eliminar el libro', 'error' => $e->getMessage()], 400);
        }
    }

    /**
     * Get one book.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function getById(int $id): JsonResponse
    {
        try {
            $book = Book::query()->findOrFail($id);
            return response()->json(['book' => $book]);
        } catch (Exception $e) {
            return response()->json(['message' => 'No se pudo encontrar el libro', 'error' => $e->getMessage()], 404);
        }
    }
}
