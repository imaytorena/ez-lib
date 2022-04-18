<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use App\Http\Requests\User\StoreRequest;
use App\Http\Requests\User\UpdateRequest;

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
     * Get all Users on a datatable format if paginate=true.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $users = User::query();
        $users = $users->paginate(10);
        return response()->json($users);
    }

    /**
     * Get all Users.
     *
     * @return JsonResponse
     */
    public function all(): JsonResponse
    {
        $users = User::query();
        $users = $users->get();
        return response()->json($users);
    }

    /**
     * Store a new user.
     *
     * @param StoreRequest $request
     * @return JsonResponse
     */
    public function create(StoreRequest $request): JsonResponse
    {
        try {
            $user = User::query()->create($request->all());
            $user->save();

            return response()->json(['user' => $user, 'message' => 'Usuario creado exitosamente'], 201);
        } catch (Exception $e) {
            return response()->json(['message' => 'Hubo un error al crear el usuario', 'error' => $e->getMessage()], 400);
        }
    }

    /**
     * Update a user.
     *
     * @param int $id
     * @param UpdateRequest $request
     * @return JsonResponse
     */
    public function update(int $id, UpdateRequest $request): JsonResponse
    {
        try {
            $user = User::query()->findOrFail($request->id);
            $user->fill($request->all());
            $user->save();

            return response()->json(['user' => $user, 'message' => 'Usuario editado exitosamente']);
        } catch (Exception $e) {
            return response()->json(['message' => 'Hubo un error al editar el usuario', 'error' => $e->getMessage()], 400);
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

            return response()->json(['user' => $user, 'message' => 'Usuario eliminado exitosamente']);
        } catch (Exception $e) {
            return response()->json(['message' => 'Hubo un error al eliminar el usuario', 'error' => $e->getMessage()], 400);
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
            return response()->json(['message' => 'No se pudo encontrar el usuario', 'error' => $e->getMessage()], 404);
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
