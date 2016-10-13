<?php

namespace App\Http\Controllers;

use App\Meeting;
use Carbon\Carbon;
use Illuminate\Http\Request;

use App\Http\Requests;
use Tymon\JWTAuth\Facades\JWTAuth;

class MeetingController extends Controller
{

	public function __construct() {

		//jwt.auth needs to be registered in the kernal.php file under $routeMiddleware
		$this->middleware('jwt.auth', ['only' => [
			'update', 'store', 'destroy'
		]]); //locks down routes to only signed in users with that are explicitly stated

	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index() {

		$meetings = Meeting::all();

		foreach ($meetings as $meeting) {

			$meeting->view_meeting = [
				'href'   => 'api/v1/meeting/' . $meeting->id,
				'method' => 'GET'
			];

		}

		$response = [
			'msg'      => 'List of all meetings',
			'meetings' => $meetings
		];

		return response()->json($response, 200);

	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request) {

		$this->validate($request, [
			'title'       => 'required',
			'description' => 'required',
			'time'        => 'required|date_format:YmdHie'
		]);

		if( !$user = JWTAuth::parseToken()->authenticate() ){ //extract user object from token if not throw an error

			return response()->json(['msg' => 'User not found'], 404);

		}

		$title = $request->input('title');
		$description = $request->input('description');
		$time = $request->input('time');
		$user_id = $user->id;

		$meeting = new Meeting([
			'time'        => Carbon::createFromFormat('YmdHie', $time), //process the time and create format
			'title'       => $title,
			'description' => $description,
		]);

		if ($meeting->save()) { //will save data to DB, return true if successful and return the data entered into the DB

			$meeting->users()->attach($user_id);//this creates the relation between meeting and user and adds both meeting and user id to the pivotal table that stores both
			$meeting->view_meeting = [
				'href'   => 'api/v1/meeting/' . $meeting->id,
				'method' => 'GET'
			];

			$response = [
				'msg'     => 'meeting created',
				'meeting' => $meeting
			];

			return response()->json($response, 201);

		}

		$response = [
			'msg' => 'There was an error in creating your meeting',
		];

		return response()->json($response, 404);

	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int $id
	 * @return \Illuminate\Http\Response
	 */
	public function show($id) {

		$meeting = Meeting::with('users')->where('id', $id)->firstOrFail(); //with pulls in the user table info as well
		$meeting->view_meetings = [
			'href'   => 'api/v1/meeting',
			'method' => 'GET'
		];

		$response = [
			'msg'     => 'Meeting Information',
			'meeting' => $meeting
		];

		return response()->json($response, 200);

	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @param  int $id
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, $id) {

		$this->validate($request, [
			'title'       => 'required',
			'description' => 'required',
			'time'        => 'required|date_format:YmdHie'
		]);

		if( !$user = JWTAuth::parseToken()->authenticate() ){ //extract user object from token if not throw an error

			return response()->json(['msg' => 'User not found'], 404);

		}

		$title = $request->input('title');
		$description = $request->input('description');
		$time = $request->input('time');
		$user_id = $user->id;

		$meeting = Meeting::with('users')->findOrFail($id);

		if( !$meeting->users()->where('users.id', $user_id)->first() ){ //check if user requesting this meeting is actually registed for the meeting

			return response()->json(['msg' => 'user not registered for meeting, update not successful'], 401);

		}

		$meeting->time = Carbon::createFromFormat('YmdHie', $time); //process the time and create format
		$meeting->title = $title;
		$meeting->description = $description;

		if( !$meeting->update() ) {

			return response()->json(['msg' => 'Error during updating meeting'], 404);

		}

		$meeting->view_meeting = [
				'href'   => 'api/v1/meeting/' . $meeting->id,
				'method' => 'GET'
		];

		$response = [
			'msg'     => 'Meeting was updated',
			'meeting' => $meeting
		];

		return response()->json($response, 200);

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

			return response()->json(['msg' => 'user not registered for meeting, update not successful'], 401);

		}

		$users = $meeting->users();
		$meeting->users()->detach();

		if( !$meeting->delete() ){ //if deleting the meeting is unsuccessful re-attach users to the meeting since you detach them above

			foreach($users as $user){
				$meeting->users()->attach($user);
			}

		}

		$response = [
			'msg'    => 'Meeting Deleted',
			'create' => [
				'href'   => 'api/v1/meeting',
				'method' => 'POST',
				'params' => 'title, description, time'
			]
		];

		return response()->json($response, 200);

	}
}
