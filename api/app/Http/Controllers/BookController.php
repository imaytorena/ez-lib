<?php

namespace App\Http\Controllers;

use App\Models\BookCopy;
use Exception;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Http\JsonResponse;

use GuzzleHttp\Client;

use App\Http\Requests\Book\UpdateRequest;
use App\Http\Requests\Book\StoreRequest;
use App\Models\Book;
use Illuminate\Http\Request;

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
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $books = Book::query();
        $books = $books->paginate(10);

        return response()->json($books);
    }

    /**
     * Get all Book.
     *
     * @return JsonResponse
     */
    public function all(): JsonResponse
    {
        $books = Book::query();
        $books = $books->get();

        return response()->json($books);
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
            $book = $request->all();
            $copies = $book['copies'];

            unset($book['copies']);
            $book = Book::query()->create($book);

            if (count($copies)) {
                $copies_created = [];
                foreach ($copies as $copy) {
                    $copy['book_id'] = $book['id'];
                    $copies_created[] = BookCopy::query()->create($copy);
                }
                $book['copies'] = $copies_created;
            }

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
            $data = $request->all();
            $copies = $data['copies'];
            unset($data['copies']);

            $book = Book::query()->findOrFail($id);

            $book->fill($data);
            $book->save();

            if (count($copies)) {
                $copies_updated = [];
                $ids = [];
                foreach ($copies as $copy) {
                    $id = $copy['id'];
                    $ids[] = $id;

                    $book_copy = BookCopy::query()->findOrFail($id);
                    $book_copy->fill($copy);
                    $book_copy->save();

                    $index = array_search($id, $ids);
                    if ($index !== FALSE) {
                        $copies_updated[$index] = $book_copy;
                    } else {
                        $copies_updated[] = $book_copy;
                    }
                }
                $book['copies'] = $copies_updated;
            }
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
     * @param Book $book
     * @return JsonResponse
     */
    public function getById(Book $book): JsonResponse
    {
        try {
            return response()->json(['book' => $book]);
        } catch (Exception $e) {
            return response()->json(['message' => 'No se pudo encontrar el libro', 'error' => $e->getMessage()], 404);
        }
    }

    /**
     * Get all public Books.
     *
     * @param Request $request
     * @return JsonResponse
     * @throws GuzzleException
     */
    public function public(Request $request): JsonResponse
    {
        $client = new Client();
        $most_viewed = [];

        $res = $client->get('http://www.etnassoft.com/api/v1/get/?get_categories=all');
        $data = $res->getBody();
        $categories = json_decode($data);


        if (isset($request->categories)) {
            return response()->json($categories);
        }

        foreach ($categories as $key => $value) {
            $category = (array)$value;
            if ($key < 2) {
                $res = $client->get("http://www.etnassoft.com/api/v1/get/?category=" . $category['nicename'] . "&criteria=most_viewed&num_items=2");
                $data = $res->getBody();
                [$a, $b] = json_decode($data);
                $most_viewed[] = $a;
                $most_viewed[] = $b;
            }
        }
        return response()->json($most_viewed);
    }
}
