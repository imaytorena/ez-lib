<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Requests\FormRequest;

class Controller extends BaseController implements FormRequest
{
    protected function respondWithToken($token)
    {
        return response()->json([
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 60
        ], 200);
    }

    public function __construct(Request $request)
    {
        $this->params = $request->all();
        $this->request = $request;
    }

    public function getParams(): Request
    {
        return $this->request->replace($this->params);
    }
    
    //hacemos funcion all que sea igual a getParams para retrocompatibilidad
    public function all(): Array
    {
        return $this->request->all();
    }

}
