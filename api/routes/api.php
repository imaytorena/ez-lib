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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::group(['prefix' => 'auth'], function () {
//     Route::post('login', 'UsersController@login')->name('login');
//     Route::post('register', 'UsersController@register')->name('register');
//     Route::get('logout', 'UsersController@logout')->middleware('auth:api')->name('logout');
// });


// AUTH
Route::group(['prefix' => 'auth'], function () {
    Route::post('login', 'AuthController@login')->name('login');
    Route::post('register', 'AuthController@register')->name('register');

    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('logout', 'AuthController@logout');
    });
});

Route::group(['middleware' => 'auth:api'], function () {
    Route::get('profile', 'UserController@profile');
});

// USERS
Route::group(['prefix' => 'users'], function () {
    Route::get('', 'UserController@index');
    Route::post('', 'UserController@create');
    Route::put('{id}', 'UserController@update');
    
    Route::get('{id}', 'UserController@getById');
    
});

// ROLES
Route::group(['prefix' => 'roles'], function () {
    Route::get('', 'RoleController@index');
    // Route::post('', 'UserController@create');
    // Route::put('{id}', 'UserController@update');
    
    Route::get('{id}', 'RoleController@getById');
    
});

// BOOKS
Route::group(['prefix' => 'books'], function () {
    Route::get('', 'BookController@index');
    Route::post('', 'BookController@create');
    Route::put('{id}', 'BookController@update');
    Route::delete('{id}', 'BookController@delete');

    Route::get('{id}', 'BookController@getById');
});

// MATERIALS
Route::group(['prefix' => 'materials'], function () {
    Route::get('', 'MaterialController@index');
    Route::post('{id}', 'MaterialController@create');
    Route::put('{id}', 'MaterialController@update');
    Route::delete('{id}', 'MaterialController@delete');

    Route::get('{id}', 'MaterialController@getById');
});

// LOANS
Route::group(['prefix' => 'loans'], function () {
    Route::get('', 'LoanController@index');
});

// PENALTIES
Route::group(['prefix' => 'penalties'], function () {
    Route::get('', 'PenaltyController@index');
});

// FEES
Route::group(['prefix' => 'fees'], function () {
    Route::get('', 'FeeController@index');
});
