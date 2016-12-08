import axios from "axios";

export const loginGetToken = ( formData, dispatch ) => {

    dispatch(requestToken());
    //return fetch(`http://laravel-rest.dev/api/v1/meeting/${meetingId}`)
    //        .then( (response) => response.json() )
    //        .then( (json) => dispatch( receiveMeeting(json) ) );
    return axios.post(`http://laravel-rest.dev/api/v1/user/signin`,{
            email: formData.email,
            password: formData.password
        })
        .then( (response) => {
            dispatch( receiveToken( response.data.token ) );
        } )
        .catch( (error) => dispatch( loginFailed(error.response.data) ) );

};

const requestToken = () => {
    return{
        type: "REQUEST_USER_TOKEN"
    }
};

const receiveToken = (token) => {
    return{
        type: "RECEIVE_USER_TOKEN",
        payload: token
    };
};

const loginFailed = (error) => {
    return{
        type: "LOGIN_USER_FAILED",
        payload: error
    };
};

export const setRedirectUrl = (currentURL) => {
    return{
        type: "SET_REDIRECT_URL",
        payload: currentURL
    };
};

export const logout = (dispatch) => {
    dispatch({
        type: "LOGOUT_USER_REQUEST"
    });
};