<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PenaltyController extends Controller
{
    /**
    * Instantiate a new PenaltiesController instance.
    *
    * @return void
    */
   public function __construct()
   {
       // $this->middleware('auth');
   }

   /**
    * Get all Penalties.
    *
    * @return Response
    */
   public function index(): Response
   {
       $dummyData = [
            ['id'=> 1, 'ticket_folio'=> 'b839e9cd-830f-36fd-9f0d', 'reason'=> 'out_date', 'details'=> '', 'total'=> '$50'],
            ['id'=> 2, 'ticket_folio'=> 'a9a5830f-36fd-9f0d-9f0d', 'reason'=> 'out_date', 'details'=> '', 'total'=> '$10'],
            ['id'=> 3, 'ticket_folio'=> '81a5b839-81a5-36d9-a9a5', 'reason'=> 'out_date', 'details'=> '', 'total'=> '$20'],
            ['id'=> 4, 'ticket_folio'=> '9e9cdb83-830f-36fd-36d9', 'reason'=> 'book4book', 'details'=> 'Entrego un libro con menor valuación, pagó la diferencia', 'total'=> '$300']
       ];
       return response()->json(['penalties' =>  $dummyData], 200);
   }
}
