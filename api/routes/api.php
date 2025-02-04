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
//        Route::get('logout', [AuthController::class, 'logout']);
//    });
});

// ROLES
Route::group(['prefix' => 'roles'], function () {
    Route::get('', [RoleController::class, 'index']);
    // Route::pos[('', '::classUserController, 'create']);
    // Route::put('{i[}', '::classUserController, 'update']);

    Route::get('{id}', [RoleController::class, 'getById']);

});

//Route::middleware(['auth:api'])->group( function () {

// USERS
Route::group(['prefix' => 'users'], function () {
    Route::get('profile', [UserController::class, 'profile']);
    Route::get('', [UserController::class, 'index']);
    Route::get('all', [UserController::class, 'all']);
    Route::post('', [UserController::class, 'create']);
    Route::put('{id}', [UserController::class, 'update']);
    Route::get('{id}', [UserController::class, 'getById']);
    Route::delete('{id}', [UserController::class, 'delete']);
});

// BOOKS
Route::group(['prefix' => 'books'], function () {
    Route::get('', [BookController::class, 'index']);
    Route::get('all', [BookController::class, 'all']);
    Route::post('', [BookController::class, 'create']);
    Route::put('{id}', [BookController::class, 'update']);
    Route::get('{id}', [BookController::class, 'getById']);
    Route::delete('{id}', [BookController::class, 'delete']);
    // COPIES
    Route::group(['prefix' => 'copies'], function () {
        Route::get('', [BookCopyController::class, 'index']);
        Route::get('all', [BookCopyController::class, 'all']);
        Route::post('', [BookCopyController::class, 'create']);
        Route::put('{id}', [BookCopyController::class, 'update']);
        Route::get('{id}', [BookCopyController::class, 'getById']);
        Route::delete('{id}', [BookCopyController::class, 'delete']);
    });
});

// MATERIALS
Route::group(['prefix' => 'materials'], function () {
    Route::get('', [MaterialController::class, 'index']);
    Route::get('all', [MaterialController::class, 'all']);
    Route::post('', [MaterialController::class, 'create']);
    Route::put('{id}', [MaterialController::class, 'update']);
    Route::get('{id}', [MaterialController::class, 'getById']);
    Route::delete('{id}', [MaterialController::class, 'delete']);
});

// LOANS
Route::group(['prefix' => 'loans'], function () {
    Route::get('', [LoanController::class, 'index']);
    Route::get('all', [LoanController::class, 'all']);
    Route::post('', [LoanController::class, 'create']);
    Route::put('{id}', [LoanController::class, 'update']);
    Route::get('{id}', [LoanController::class, 'getById']);
    Route::delete('{id}', [LoanController::class, 'delete']);
});

// PENALTIES
Route::group(['prefix' => 'penalties'], function () {
    Route::get('', [PenaltyController::class, 'index']);
    Route::get('all', [PenaltyController::class, 'all']);
    Route::post('', [PenaltyController::class, 'create']);
    Route::put('{id}', [PenaltyController::class, 'update']);
    Route::get('{id}', [PenaltyController::class, 'getById']);
    Route::delete('{id}', [PenaltyController::class, 'delete']);
});

// FEES
Route::group(['prefix' => 'fees'], function () {
    Route::get('', [FeeController::class, 'index']);
    Route::get('all', [FeeController::class, 'all']);
    Route::post('', [FeeController::class, 'create']);
    Route::put('{id}', [FeeController::class, 'update']);
    Route::get('{id}', [FeeController::class, 'getById']);
    Route::delete('{id}', [FeeController::class, 'delete']);
});


// REPORTS
Route::group(['prefix' => 'reports'], function () {
    Route::get('{model}/{slug}', [ExcelCSVController::class, 'export']);
});
//});

// PUBLIC
//Route::group(['prefix' => 'public'], function () {
//    Route::get('books', [BookController::class, 'public']);
//});
//});
