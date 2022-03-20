<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Http\Requests\StoreModel\StoreUserRequest;
use App\Models\User;

class UserController extends Controller
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

        $users = User::query();
        if ($paginate) {
            $users = $users->paginate(10);
        } else {
            $users = $users->get();
        }
        
        return response()->json(['users' =>  $users], 200);
    }

    /**
     * Store a new user.
     *
     * @param  StoreUserRequest  $request
     * @return Response
     */
    public function create(StoreUserRequest $request)
    {
        try {
            $user = User::create($request->all());

            $user->save();
            // return successful response
            return response()->json(['user' => $user, 'message' => 'Usuario creado exitosamente'], 201);

        } catch (\Exception $e) {
            //return error message
            return response()->json(['message' => $e->getMessage()], 409);
        }
    }

    /**
     * Update a user.
     *
     * @param  UpdateUserRequest  $request
     * @return Response
     */
    public function update($id, StoreUserRequest $request)
    {
        try {
            $user = User::findOrFail($id);
            
            $user->fill($request->all());
            $user->save();
            
            // return successful response
            return response()->json(['user' => $user, 'message' => 'Usuario editado exitosamente'], 201);

        } catch (\Exception $e) {
            //return error message
            return response()->json(['message' => $e->getMessage()], 409);
        }
    }
    
    /**
     * Delete a user.
     *
     * @param  Request  $request
     * @return Response
     */
    public function delete($id, Request $request)
    {
        try {
            $user = User::findOrFail($id);
            
            $user->delete();
            $user->save();
            
            // return successful response
            return response()->json(['user' => $user, 'message' => 'Usuario eliminado exitosamente'], 201);
        } catch (\Exception $e) {
            //return error message
            return response()->json(['message' => $e->getMessage()], 409);
        }
    }
    
    /**
     * Get one user.
     *
     * @return Response
     */
    public function getById($id)
    {
        try {
            $user = User::findOrFail($id);

            return response()->json(['user' => $user], 200);

        } catch (\Exception $e) {

            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
    }

    /**
     * Get the authenticated User.
     *
     * @return Response
     */
    public function profile()
    {
        return response()->json(['user' => Auth::user()], 200);
    }
}
