<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Material;

class MaterialController extends Controller
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

        $materials = Material::query();
        if ($paginate) {
            $materials = $materials->paginate(10);
        } else {
            $materials = $materials->get();
        }
        
        return response()->json(['materials' =>  $materials], 200);
    }
    
    /**
     * Store a new material.
     *
     * @param  Request  $request
     * @return Response
     */
    public function create(Request $request)
    {
        try {
            $material = Material::create($request->all());

            return response()->json(['material' => $material], 200);

        } catch (\Exception $e) {

            return response()->json(['message' => 'material not found!'], 404);
        }
    }

    /**
     * Update a material.
     *
     * @param  Request  $request
     * @param  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        try {
            // $material = Material::create($request->all());
            $material = Material::find($id);

            return response()->json(['material' => $material], 200);

        } catch (\Exception $e) {

            return response()->json(['message' => 'material not found!'], 404);
        }
    }
    
    /**
     * Delete a material.
     *
     * @param  $id
     * @return Response
     */
    public function delete($id)
    {
        try {
            // $material = Material::create($request->all());
            $material = Material::find($id);

            return response()->json(['material' => $material], 200);

        } catch (\Exception $e) {

            return response()->json(['message' => 'material not found!'], 404);
        }
    }
    
    /**
     * Get one material.
     *
     * @param  $id
     * @return Response
     */
    public function getById($id)
    {
        try {
            $material = Material::findOrFail($id);

            return response()->json(['material' => $material], 200);

        } catch (\Exception $e) {

            return response()->json(['message' => 'material not found!'], 404);
        }

    }
}