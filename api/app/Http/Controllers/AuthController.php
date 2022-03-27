<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;
use App\Http\Requests\StoreModel\StoreUserRequest;
use App\Models\User;

class AuthController extends Controller
{
    /**
     * Store a new user.
     *
     * @param  StoreUserRequest  $request
     * @return Response
     */
    public function register(StoreUserRequest $request)
    {
        try {
            $user = User::create($request->all());
            $accessToken = $user->createToken('appToken')->accessToken;
            $user->save();

            $user['token'] = $accessToken;
            
            // return successful response
            return response()->json(['user' => $user, 'message' => 'Usuario registrado exitosamente'], 201);

        } catch (\Exception $e) {
            \Log::info($e);
            return response()->json(['message' => $e->getMessage()], 409);
        }
    }

    /**
     * Get a JWT via given credentials.
     *
     * @param  Request  $request
     * @return Response
     */
    public function login(Request $request)
    {
        //validate incoming request 
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $credentials = $request(['email', 'password']);
        
        \Log::info($credentials);
        
        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user = $request->user();
        $tokenResult = $request->createToken('Personal Access Token');
        $token = $tokenResult->token;


        $token = $tokenResult->token;
        $token->expires_at = Carbon::now()->addWeeks(1);
        $token->save();

        return response()->json([
            "access_token" => $tokenResult->accessToken,
            "token_type" => "Bearer",
            "expires_at" => \Carbon\Carbon::parse($tokenResult->token->expires_at->toDateTimeString())
        ]);
        // return response()->json(['message' => 'No fue posible terminar la sesión'], 400);
        // return $this->respondWithToken($token);
    }

    /**
     * Logout
     *
     * @param  Request  $request
     * @return Response
     */
    public function logout()
    {
        if (Auth::user()) {
            $user = Auth::user()->token();
            $user->revoke();
            return response()->json(['message' => 'Sesión terminada exitosamente'], 201);
        }

        return response()->json(['message' => 'No fue posible terminar la sesión'], 400);
    }
}
