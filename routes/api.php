<?php

use Illuminate\Http\Request;

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

Route::group( ['prefix' => 'v1'], function(){

	Route::resource('meeting', 'MeetingController', [
			'except' => ['edit', 'create'] //this removes those two routes from the resource since you wont need a form to create or update meetings (by way of request only)
	]);

	Route::resource('meeting/registration', 'RegistrationController', [
			'only' => ['store', 'destroy'] //this only adds the two routes for registering and un-registering a meeting
	]);

	Route::post('user', [
			'uses' => 'AuthController@store'
	]);

	Route::post('user/signin', [
			'uses' => 'AuthController@signin'
	]);

});
