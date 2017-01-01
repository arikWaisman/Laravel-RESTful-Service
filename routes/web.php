<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

//this is to ensure the front end app handles the routing with pushstate rather than making a request to server
Route::any('/{js_route?}', function(){
    return view('welcome');
    })->where('js_route', '[\/\w\.-]*');

