import axios from "axios";

export function fetchAllMeetings(){

    const request = axios.get('http://laravel-rest.dev/api/v1/meeting');

    return {
        type: "FETCH_ALL_MEETINGS",
        payload: request
    };
    //return (dispatch) => {
    //
    //    dispatch({type: "FETCH_ALL_MEETINGS_STARTED" });
    //    return axios.get('http://laravel-rest.dev/api/v1/meeting').then(
    //        (result) => dispatch({type: "FETCH_ALL_MEETINGS_FINISHED", payload: result})
    //    );
    //
    //};

}