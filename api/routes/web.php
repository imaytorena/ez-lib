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

$router->group(['prefix' => 'api'], function () use ($router) {

    // AUTH
    $router->group(['prefix' => 'auth'], function () use ($router) {
        $router->post('login', 'AuthController@login');
        $router->post('register', 'AuthController@register');
    });
    
    // USUARIOS
    $router->get('profile', 'UserController@profile');

    $router->group(['prefix' => 'users'], function () use ($router) {
        $router->get('', 'UserController@index');
        $router->get('{id}', 'UserController@getById');
        
    });

    // LIBROS
    $router->group(['prefix' => 'books'], function () use ($router) {
        $router->get('', 'BookController@index');
        $router->post('{id}', 'BookController@create');
        $router->put('{id}', 'BookController@update');
        $router->delete('{id}', 'BookController@delete');

        $router->get('{id}', 'BookController@getById');
    });
});
