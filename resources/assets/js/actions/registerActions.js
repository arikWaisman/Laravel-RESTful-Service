import axios from "axios";

export const createNewUser = ( formData, dispatch ) => {

    dispatch(createUserRequest());
    //return fetch(`http://laravel-rest.dev/api/v1/meeting/${meetingId}`)
    //        .then( (response) => response.json() )
    //        .then( (json) => dispatch( receiveMeeting(json) ) );
    return axios.post(`http://laravel-rest.dev/api/v1/user`,{
            name: formData.name,
            email: formData.email,
            password: formData.password
        })
        .then( (response) => {
            //console.log(r)
            dispatch( createUserSuccess( response.data.msg ) );
        } )
        .catch( (error) => dispatch( createUserFailed(error.response.data) ) );

};

const createUserRequest = () => {
    return{
        type: "CREATE_USER_REQUEST"
    }
};

const createUserSuccess = (msg) => {
    return{
        type: "CREATE_USER_SUCCESS",
        payload: msg
    };
};

const createUserFailed = (error) => {
    return{
        type: "CREATE_USER_FAILED",
        payload: error
    };
};