<?php

use Illuminate\Http\Request;
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

    Route::post('login', 'AuthController@login')
        ->name('login');
    Route::post('register', 'AuthController@register')
        ->name('register');

    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('logout', 'AuthController@logout');
    });
});

Route::group(['middleware' => 'auth:api'], function () {
    Route::get('profile', 'UserController@profile');
});

// USERS
Route::group(['prefix' => 'users', 'middleware' => 'auth:api'], function () {
    Route::get('', 'UserController@index');
    Route::post('', 'UserController@create');
    Route::put('{id}', 'UserController@update');
    
    Route::get('{id}', 'UserController@getById');
    
});

// ROLES
Route::group(['prefix' => 'roles', 'middleware' => 'auth:api'], function () {
    Route::get('', 'RoleController@index');
    // Route::post('', 'UserController@create');
    // Route::put('{id}', 'UserController@update');
    
    Route::get('{id}', 'RoleController@getById');
    
});

// BOOKS
Route::group(['prefix' => 'books', 'middleware' => 'auth:api'], function () {
    Route::get('', 'BookController@index');
    Route::post('', 'BookController@create');
    Route::put('{id}', 'BookController@update');
    Route::delete('{id}', 'BookController@delete');

    Route::get('{id}', 'BookController@getById');
});

// MATERIALS
Route::group(['prefix' => 'materials', 'middleware' => 'auth:api'], function () {
    Route::get('', 'MaterialController@index');
    Route::post('{id}', 'MaterialController@create');
    Route::put('{id}', 'MaterialController@update');
    Route::delete('{id}', 'MaterialController@delete');

    Route::get('{id}', 'MaterialController@getById');
});

// LOANS
Route::group(['prefix' => 'loans', 'middleware' => 'auth:api'], function () {
    Route::get('', 'LoanController@index');
});

// PENALTIES
Route::group(['prefix' => 'penalties', 'middleware' => 'auth:api'], function () {
    Route::get('', 'PenaltyController@index');
});

// FEES
Route::group(['prefix' => 'fees', 'middleware' => 'auth:api'], function () {
    Route::get('', 'FeeController@index');
});
