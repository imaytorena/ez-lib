<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Fee;

class FeeController extends Controller
{
    /**
    * Instantiate a new FeeController instance.
    *
    * @return void
    */
   public function __construct()
   {
       // $this->middleware('auth');
   }

   /**
    * Get all Fee.
    *
    * @return Response
    */
   public function index()
   {
       return response()->json(['fees' =>  Fee::all()], 200);
   }
   
   /**
    * Store a new fee.
    *x
    * @param  Request  $request
    * @return Response
    */
   public function create(Request $request)
   {
       try {
           $fee = Fee::create($request->all());

           return response()->json(['fee' => $fee], 200);

       } catch (\Exception $e) {

           return response()->json(['message' => 'fee not found!'], 404);
       }
   }

   /**
    * Update a fee.
    *
    * @param  Request  $request
    * @param  $id
    * @return Response
    */
   public function update(Request $request, $id)
   {
       try {
           // $fee = Fee::create($request->all());
           $fee = Fee::find($id);

           return response()->json(['fee' => $fee], 200);

       } catch (\Exception $e) {

           return response()->json(['message' => 'fee not found!'], 404);
       }
   }
   
   /**
    * Delete a fee.
    *
    * @param  $id
    * @return Response
    */
   public function delete($id)
   {
       try {
           // $fee = Fee::create($request->all());
           $fee = Fee::find($id);

           return response()->json(['fee' => $fee], 200);

       } catch (\Exception $e) {

           return response()->json(['message' => 'fee not found!'], 404);
       }
   }
   
   /**
    * Get one fee.
    *
    * @param  $id
    * @return Response
    */
   public function getById($id)
   {
       try {
           $fee = Fee::findOrFail($id);

           return response()->json(['fee' => $fee], 200);

       } catch (\Exception $e) {

           return response()->json(['message' => 'fee not found!'], 404);
       }
   }
}
