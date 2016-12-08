import axios from "axios";
import {browserHistory} from "react-router";

export const fetchMeeting = (meetingId, dispatch) => {

    //return fetch(`http://laravel-rest.dev/api/v1/meeting/${meetingId}`)
    //        .then( (response) => response.json() )
    //        .then( (json) => dispatch( receiveMeeting(json) ) );

    dispatch({type: "REQUEST_MEETING"}); //dispatch that request has begun
    return axios.get(`http://laravel-rest.dev/api/v1/meeting/${meetingId}`)
                .then( (response) => dispatch( receiveMeeting(response.data) ) )
                .catch( (error) => dispatch( fetchMeetingFailed(error.response.data) ) );

};

const receiveMeeting = (json) => {
    return{
        type: "RECEIVE_MEETING",
        payload: json
    };
};

const fetchMeetingFailed = (errors) => {
    return{
        type: "FETCH_MEETING_FAILED",
        payload: errors
    }
};

export const createNewMeeting = ( formData, token, dispatch) => {

    dispatch({type: "UPDATE_MEETING_REQUEST"});

    //this call needs a token as its protected on the server
    return axios.post(`http://laravel-rest.dev/api/v1/meeting?token=${token}`, {
        time: formData.time,
        title: formData.title,
        description: formData.description
    })
    .then( (response) => {
        const meetingId = response.data.meeting.id;
        dispatch({type: "MEETING_CREATED_REDIRECT_TO_MEETING"});
        browserHistory.replace(`meeting/${meetingId}`)
    })
    .catch( (error) => dispatch( createMeetingFailed(error.response.data) ) );

};

const createMeetingFailed = (error) => {
    return{
        type: "CREATE_MEETING_FAILED",
        payload: error
    }
};

