<?php

namespace App\Http\Controllers;

use App\Meeting;
use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use Tymon\JWTAuth\Facades\JWTAuth;

class RegistrationController extends Controller
{

	public function __construct() {

		//jwt.auth needs to be registered in the kernal.php file under $routeMiddleware
		$this->middleware('jwt.auth'); //locks down all routes

	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request) {

		$this->validate($request, [
			'meeting_id' => 'required',
			'user_id'    => 'required'
		]);

		$meeting_id = $request->input('meeting_id');
		$user_id = $request->input('user_id');

		$meeting = Meeting::findOrFail($meeting_id);
		$user = User::findOrFail($user_id);

		$message = [
			'msg'        => 'User is already registered for meeting',
			'user'       => $user,
			'meeting'    => $meeting,
			'unregister' => [
				'href'   => 'api/v1/meeting/registration/' . $meeting->id,
				'method' => 'DELETE'
			]
		];

		if( $meeting->users()->where('users.id', $user->id)->first() ){ //check if a user is already registered/connected to  the meeting

			return response()->json($message, 404);

		}

		$user->meetings()->attach($meeting);

		$response = [
			'msg'        => 'User registered for meeting',
			'meeting'    => $meeting,
			'user'       => $user,
			'unregister' => [
				'href'   => 'api/v1/meeting/registration/' . $meeting->id,
				'method' => 'DELETE'
			]
		];

		return response()->json($response, 201);
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int $id
	 * @return \Illuminate\Http\Response
	 */
	public function destroy($id) {

		$meeting = Meeting::findOrFail($id);
		if( !$user = JWTAuth::parseToken()->authenticate() ){ //extract user object from token if not throw an error

			return response()->json(['msg' => 'User not found'], 404);

		}

		if( !$meeting->users()->where('users.id', $user->id)->first() ){ //check if user requesting this meeting is actually registed for the meeting

			return response()->json(['msg' => 'user not registered for meeting, delete not successful'], 401);

		}

		$meeting->users()->detach($user->id);

		$response = [
			'msg'      => 'User unregistered from meeting',
			'meeting'  => $meeting,
			'user'     => $user->id,
			'register' => [
				'href'   => 'api/v1/meeting/registration/',
				'method' => 'POST',
				'params' => 'user_id, meeting_id'
			]
		];

		return response()->json($response, 200);

	}
}
