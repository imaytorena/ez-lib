<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;

class BookController extends Controller
{
     /**
     * Instantiate a new UserController instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }

    /**
     * Get all User.
     *
     * @return Response
     */
    public function index(Request $request, $paginate=true)
    {
        $books = Book::query();
        if ($paginate) {
            $books = $books->paginate(10);
        } else {
            $books = $books->get();
        }
        
        return response()->json(['books' =>  $books], 200);
    }
    
    /**
     * Store a new book.
     *x
     * @param  Request  $request
     * @return Response
     */
    public function create(Request $request)
    {
        try {
            $book = Book::create($request->all());

            return response()->json(['book' => $book], 200);

        } catch (\Exception $e) {

            return response()->json(['message' => 'book not found!'], 404);
        }
    }

    /**
     * Update a book.
     *
     * @param  Request  $request
     * @param  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        try {
            // $book = Book::create($request->all());
            $book = Book::findOrFail($id);

            return response()->json(['book' => $book], 200);

        } catch (\Exception $e) {

            return response()->json(['message' => 'book not found!'], 404);
        }
    }
    
    /**
     * Delete a book.
     *
     * @param  $id
     * @return Response
     */
    public function delete($id)
    {
        try {
            // $book = Book::create($request->all());
            $book = Book::find($id);

            return response()->json(['book' => $book], 200);

        } catch (\Exception $e) {

            return response()->json(['message' => 'book not found!'], 404);
        }
    }
    
    /**
     * Get one book.
     *
     * @param  $id
     * @return Response
     */
    public function getById($id)
    {
        try {
            $book = Book::findOrFail($id);

            return response()->json(['book' => $book], 200);

        } catch (\Exception $e) {

            return response()->json(['message' => 'book not found!'], 404);
        }

    }
}