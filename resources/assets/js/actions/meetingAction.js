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

    dispatch({type: "CREATE_NEW_MEETING_REQUEST"});

    //this call needs a token as its protected on the server
    return axios.post(`http://laravel-rest.dev/api/v1/meeting?token=${token}`, {
        time: formData.time,
        title: formData.title,
        description: formData.description
    })
    .then( (response) => {
        let meetingId = response.data.meeting.id;
        dispatch({type: "MEETING_CREATED_REDIRECT_TO_MEETING"});
        browserHistory.replace(`meeting/${meetingId}`)
    })
    .catch( (error) => {

        dispatch( createMeetingFailed(error.response.data) );
        redirectToLoginIfTokenExp(error.response.status, dispatch);


    });

};

const createMeetingFailed = (error) => {
    return{
        type: "CREATE_MEETING_FAILED",
        payload: error
    }
};

export const updateMeeting = ( formData, token, meetingId, dispatch) => {

    dispatch({type: "UPDATE_MEETING_REQUEST"});
    return axios.patch(`http://laravel-rest.dev/api/v1/meeting/${meetingId}/?token=${token}`, {
        time: formData.time,
        title: formData.title,
        description: formData.description
    })
    .then( (response) => {

        dispatch( receiveUpdatedMeeting(response.data) );
        browserHistory.replace(`/meeting/${meetingId}`);


    })
    .catch( (error) =>{

        dispatch( updateMeetingFailed(error.response.data) );
        redirectToLoginIfTokenExp(error.response.status, dispatch);

    } );
};

const receiveUpdatedMeeting = (json) => {
    return{
        type: "RECEIVE_UPDATED_MEETING_AND_REDIRECT",
        payload: json
    };
};

const updateMeetingFailed = (error) => {
    return{
        type: "UPDATE_MEETING_FAILED",
        payload: error
    };
};

export const deleteMeeting = (token, meetingId, dispatch) => {

    dispatch({type: "DELETE_MEETING_REQUEST"});
    return axios.delete(`http://laravel-rest.dev/api/v1/meeting/${meetingId}/?token=${token}`)
        .then( (response) => {

            dispatch( deleteMeetingSuccess(response.data) );
            browserHistory.replace(`/`);

        })
        .catch( (error) =>{

            dispatch( deleteMeetingFailed(error.response.data) );
            redirectToLoginIfTokenExp(error.response.status, dispatch); //this should clear token errors on the front end

        } );


};

const deleteMeetingSuccess = (json) => {
    return{
        type: "MEETING_DELETED_REDIRECT_HOME",
        payload: json
    };
};

const deleteMeetingFailed = (error) => {
    return{
        type: "DELETE_MEETING_FAILED",
        payload: error
    };
};

export const registerToMeeting = ( userId, meetingId, token, dispatch ) => {

    dispatch({
        type: "REGISTER_FOR_MEETING_REQUEST"
    });
    return axios.post(`http://laravel-rest.dev/api/v1/meeting/registration?token=${token}`,{
            meeting_id: meetingId,
            user_id: userId
        })
        .then( (response) => {
            dispatch( registrationToMeetingSuccess( response.data ) );
        } )
        .catch( (error) => {
            dispatch( registrationToMeetingFailed(error.response.data) );
            redirectToLoginIfTokenExp(error.response.status, dispatch); //this should clear token errors on the front end

        });

};

const registrationToMeetingSuccess = (json) => {
    return{
        type: "REGISTRATION_SUCCESS", //the response from the server contains objects not needed in store currently. I pull out what I need and send it to the reducer following the API's naming conventions
        payload: {
            meeting: json.meeting,
            msg: json.msg
        }
    };
};

const registrationToMeetingFailed = (error) => {
    return{
        type: "REGISTRATION_FAILED",
        payload: error
    };
};


export const unregisterFromMeeting = (meetingId, token, dispatch) => {

    dispatch({
        type: "UNREGISTER_FROM_MEETING_REQUEST"
    });
    return axios.delete(`http://laravel-rest.dev/api/v1/meeting/registration/${meetingId}?token=${token}`)
            .then( (response) => {
                dispatch( unregisterFromMeetingSuccess(response.data) );
            })
            .catch( (error) => {
                dispatch( unregisterFromMeetingFailed(error.response.data) );
                redirectToLoginIfTokenExp(error.response.status, dispatch); //this should clear token errors on the front end
            })

};

const unregisterFromMeetingSuccess = (json) => {
    return{
        type: "UNREGISTER_FROM_MEETING_SUCCESS", //the response from the server contains objects not needed in store currently. I pull out what I need and send it to the reducer following the API's naming conventions
        payload: {
            meeting: json.meeting,
            msg: json.msg
        }
    };
};

const unregisterFromMeetingFailed = (error) => {
    return{
        type: "UNREGISTER_FROM_MEETING_FAILED",
        payload: error
    };
};

const redirectToLoginIfTokenExp = (statusCode, dispatch) => {
    if(statusCode == 401){
        dispatch({type: 'LOGOUT_USER_REQUEST'}); //dispatch authAction here to set isLoggedIn and other items in Auth store when token expires
    }
};