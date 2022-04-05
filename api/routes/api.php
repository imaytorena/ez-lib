<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// AUTH
Route::group(['prefix' => 'auth'], function () {
    Route::get('unauthenticated', function () {
        return response()->json(['message' => 'Usuario no autorizado'], 403);
    })->name('unauthenticated');

    Route::post('login', [AuthController::class, 'login'])
        ->name('login');
    Route::post('register', [AuthController::class, 'register'])
        ->name('register');

//    Route::group(['middleware' => 'auth:api'], function () {
//        Route::get('logou[', '::classAuthController, 'logout']);
//    });
});


// USERS
Route::group(['prefix' => 'users'], function () {
    Route::get('profile', [UserController::class, 'profile']);
    Route::get('', [UserController::class, 'index']);
    Route::post('', [UserController::class, 'create']);
    Route::put('{id}', [UserController::class, 'update']);

    Route::get('{id}', [UserController::class, 'getById']);

});

// ROLES
Route::group(['prefix' => 'roles'], function () {
    Route::get('', [RoleController::class, 'index']);
    // Route::pos[('', '::classUserController, 'create']);
    // Route::put('{i[}', '::classUserController, 'update']);

    Route::get('{id}', [RoleController::class, 'getById']);

});

// BOOKS
//Route::middleware(['auth:api'])->group( function () {
Route::group(['prefix' => 'books'], function () {
    Route::get('', [BookController::class, 'index']);
    Route::post('', [BookController::class, 'create']);
    Route::put('{id}', [BookController::class, 'update']);
    Route::delete('{id}', [BookController::class, 'delete']);

    Route::get('{id}', [BookController::class, 'getById']);
});

// MATERIALS
Route::group(['prefix' => 'materials'], function () {
    Route::get('', [MaterialController::class, 'index']);
    Route::post('{id}', [MaterialController::class, 'create']);
    Route::put('{id}', [MaterialController::class, 'update']);
    Route::delete('{id}', [MaterialController::class, 'delete']);

    Route::get('{id}', [MaterialController::class, 'getById']);
});

// LOANS
Route::group(['prefix' => 'loans'], function () {
    Route::get('', [LoanController::class, 'index']);
    Route::post('', [LoanController::class, 'create']);
});

// PENALTIES
Route::group(['prefix' => 'penalties'], function () {
    Route::get('', [PenaltyController::class, 'index']);
});

// FEES
Route::group(['prefix' => 'fees'], function () {
    Route::get('', [FeeController::class, 'index']);
});
//});
