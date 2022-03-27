<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Role;

class RoleController extends Controller
{
    /**
     * Instantiate a new RoleController instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }

    /**
     * Get all Role.
     *
     * @return Response
     */
    public function index(Request $request, $paginate=true)
    {
        $roles = Role::query();
        $roles = $roles->withCount('permissions');

        if ($paginate) {
            $roles = $roles->paginate(10);
        } else {
            $roles = $roles->get();
        }
        
        return response()->json(['roles' =>  $roles], 200);
    }


    /**
     * Store a new role.
     *
     * @param  Request  $request
     * @return Response
     */
    public function create(Request $request)
    {
        try {
            $role = Role::create($request->all());

            $role->save();
            // return successful response
            return response()->json(['role' => $role, 'message' => 'Usuario creado exitosamente'], 201);

        } catch (\Exception $e) {
            //return error message
            return response()->json(['message' => $e->getMessage()], 409);
        }
    }

    /**
     * Update a role.
     *
     * @param  Request  $request
     * @return Response
     */
    public function update($id, Request $request)
    {
        try {
            $role = Role::findOrFail($id);
            
            $role->fill($request->all());
            $role->save();
            
            // return successful response
            return response()->json(['role' => $role, 'message' => 'Usuario editado exitosamente'], 201);

        } catch (\Exception $e) {
            //return error message
            return response()->json(['message' => $e->getMessage()], 409);
        }
    }
    
    /**
     * Delete a role.
     *
     * @param  Request  $request
     * @return Response
     */
    public function delete($id, Request $request)
    {
        try {
            $role = Role::findOrFail($id);
            
            $role->delete();
            $role->save();
            
            // return successful response
            return response()->json(['role' => $role, 'message' => 'Usuario eliminado exitosamente'], 201);
        } catch (\Exception $e) {
            //return error message
            return response()->json(['message' => $e->getMessage()], 409);
        }
    }
    
    /**
     * Get role data with permissions.
     *
     * @param number $id
     * @return Response
     */
    public function getById($id)
    {
        try {
            $role = Role::findOrFail($id)->with('permissions')->first();

            return response()->json(['role' => $role], 201);

        } catch (\Exception $e) {

            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
    }
}
