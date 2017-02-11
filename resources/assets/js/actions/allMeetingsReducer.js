import axios from "axios";


export function fetchAllMeetings( dispatch ){

    dispatch({type: "FETCH_ALL_MEETINGS"});
    return axios.get('http://laravel-rest.dev/api/v1/meeting')
        .then( (response) => dispatch( receiveAllMeetings(response.data) ) )
        .catch( (error) => dispatch( fetchAllMeetingsFailed(error.response.data) ) );

    //return (dispatch) => {
    //
    //    dispatch({type: "FETCH_ALL_MEETINGS_STARTED" });
    //    return axios.get('http://laravel-rest.dev/api/v1/meeting').then(
    //        (result) => dispatch({type: "FETCH_ALL_MEETINGS_FINISHED", payload: result})
    //    );
    //
    //};

}

const receiveAllMeetings = (json) => {

    return {
        type: "RECEIVE_ALL_MEETINGS",
        payload: json
    };

};

const fetchAllMeetingsFailed = (errors) => {
    return{
        type: "FETCH_MEETINGS_FAILED",
        payload: errors
    }
};


