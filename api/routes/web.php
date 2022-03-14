<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'api'], function () use ($router) {

    // AUTH
    $router->group(['prefix' => 'auth'], function () use ($router) {
        $router->post('login', 'AuthController@login');
        $router->post('register', 'AuthController@register');
    });
    
    // USERS
    $router->get('profile', 'UserController@profile');

    $router->group(['prefix' => 'users'], function () use ($router) {
        $router->get('', 'UserController@index');
        $router->post('', 'UserController@create');
        
        $router->get('{id}', 'UserController@getById');
        
    });

    // BOOKS
    $router->group(['prefix' => 'books'], function () use ($router) {
        $router->get('', 'BookController@index');
        $router->post('{id}', 'BookController@create');
        $router->put('{id}', 'BookController@update');
        $router->delete('{id}', 'BookController@delete');

        $router->get('{id}', 'BookController@getById');
    });

    // MATERIALS
    $router->group(['prefix' => 'materials'], function () use ($router) {
        $router->get('', 'MaterialController@index');
        $router->post('{id}', 'MaterialController@create');
        $router->put('{id}', 'MaterialController@update');
        $router->delete('{id}', 'MaterialController@delete');

        $router->get('{id}', 'MaterialController@getById');
    });

    // LOANS
    $router->group(['prefix' => 'loans'], function () use ($router) {
        $router->get('', 'LoanController@index');
    });
    
    // PENALTIES
    $router->group(['prefix' => 'penalties'], function () use ($router) {
        $router->get('', 'PenaltyController@index');
    });

    // FEES
    $router->group(['prefix' => 'fees'], function () use ($router) {
        $router->get('', 'FeeController@index');
    });
});
