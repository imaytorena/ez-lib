<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

use App\Http\Requests\StoreModel\StoreUserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Log;

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
     * @param bool $paginate
     * @return JsonResponse
     */
    public function index(bool $paginate=true): JsonResponse
    {
        $users = User::query();

        if ($paginate) {
            $users = $users->paginate(10);
        } else {
            $users = $users->get();
        }

        return response()->json(['users' =>  $users]);
    }

    /**
     * Store a new user.
     *
     * @param  StoreUserRequest  $request
     * @return JsonResponse
     */
    public function create(StoreUserRequest $request): JsonResponse
    {
        try {
            $user = User::query()->create($request->all());
            $user->save();

            return response()->json(['user' => $user, 'message' => 'Usuario creado exitosamente'], 201);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 409);
        }
    }

    /**
     * Update a user.
     *
     * @param $id
     * @param StoreUserRequest $request
     * @return JsonResponse
     */
    public function update($id, StoreUserRequest $request): JsonResponse
    {
        try {
            $user = User::query()->findOrFail($id);

            $user->fill($request->all());
            $user->save();

            return response()->json(['user' => $user, 'message' => 'Usuario editado exitosamente']);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 409);
        }
    }

    /**
     * Delete a user.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function delete(int $id): JsonResponse
    {
        try {
            $user = User::query()->findOrFail($id);

            $user->delete();
            $user->save();

            return response()->json(['user' => $user, 'message' => 'Usuario eliminado exitosamente']);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 409);
        }
    }

    /**
     * Get one user.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function getById(int $id): JsonResponse
    {
        try {
            $user = User::query()->findOrFail($id);

            return response()->json(['user' => $user]);

        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
    }

    /**
     * Get the authenticated User.
     *
     * @return JsonResponse
     */
    public function profile(): JsonResponse
    {
        return response()->json(['user' => Auth::user()]);
    }
}
