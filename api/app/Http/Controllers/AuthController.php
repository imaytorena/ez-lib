<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreModel\StoreUserRequest;

use Illuminate\Auth\Events\Registered;
use Illuminate\Validation\Rules;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

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
            $request->validate([
                'username' => ['required', 'string', 'max:255'],
                'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
                'password' => ['required', Rules\Password::defaults()],
            ]);

            $user = User::create([
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
            
            // $tokenResult = $user->createToken('Personal Access Token');
            // $token = $tokenResult->token;
            
            // if ($request->remember_me)
            //     $token->expires_at = Carbon::now()->addWeeks(1);
            // $token->save();
            
            return response()->json(['user' => $user, 'message' => 'Usuario registrado exitosamente'], 201);

        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 409);
        }
    }

    /**
     * Inicio de sesión y creación de token
     */
    public function login(Request $request)
    {
        \Log::info($request);
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            // 'remember_me' => 'boolean|nullable'
        ]);

        $credentials = request(['email', 'password']);

        if (!Auth::attempt($credentials))
        {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');

        $token = $tokenResult->token;
        if ($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(1);
        $token->save();

        return response()->json([
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse($token->expires_at)->toDateTimeString()
        ]);
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
