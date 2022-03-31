<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreModel\StoreUserRequest;

use Illuminate\Auth\Events\Registered;
use Illuminate\Validation\Rules;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

use App\Models\User;

class AuthController extends Controller
{

    protected static function createPasswordToken($username, $password)
    {
        $client = DB::table('oauth_clients')->where('id', env('PASSPORT_PASSWORD_CLIENT_ID'))->first();

        $tokenRequest = Request::create('/oauth/token','post');
        $tokenRequest->request->add([
            'grant_type'    => 'password',
            'client_id'     => $client->id,
            'client_secret' => $client->secret,
            'username'      => $username,
            'password'      => $password,
            'scope'         => ''
        ]);

        try {
            $tokenResponse = app()->handle($tokenRequest);
            return json_decode($tokenResponse->getContent());
        } catch (\Exception $e) {
            return $e;
        }
    }

    protected static function refreshToken($refreshToken)
    {
        $client = DB::table('oauth_clients')->where('id', env('PASSPORT_PASSWORD_CLIENT_ID'))->first();

        $tokenRequest = Request::create('/oauth/token','post');
        $tokenRequest->request->add([
            'grant_type'    => 'refresh_token',
            'refresh_token' => $refreshToken,
            'client_id'     => $client->id,
            'client_secret' => $client->secret,
            'scope' =>      ''
        ]);

        try {
            $tokenResponse = app()->handle($tokenRequest);
            return json_decode($tokenResponse->getContent());
        } catch (\Exception $e) {
            return $e;
        }
    }
    /**
     * Store a new user.
     *
     * @param  StoreUserRequest  $request
     * @return Response
     */
    public function register(Request $request)
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
                
            $user = $request->user();
            $token = $this->createPasswordToken($request->email, $request->password);
            
            return response()->json(['user' => $user, 'token' => $token, 'message' => 'Usuario registrado exitosamente'], 201);

        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 409);
        }
    }

    /**
     * Inicio de sesión y creación de token
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);
        
        $credentials = $request->only(['email', 'password']);

        if (!Auth::attempt($credentials))
        {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        $user = $request->user();
        $token = $this->createPasswordToken($request->email, $request->password);

        return response()->json(['user' => $user, 'token' => $token]);
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
