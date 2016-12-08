const authReducer = (state = {
    isLoggedIn: sessionStorage.getItem('token') ? true : false, //check if logged in
    token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null, //check if logged in,
    redirectAfterLoginURL: "/test"
}, action) => {
    switch (action.type) {
        case "RECEIVE_USER_TOKEN":
            state = {
                ...state,
                isLoggedIn: true,
                token: action.payload, //grabbing the token from payload directly to not have to index in later
                errors: false //this is set to false to ensure that on success the errors object doesnt exist and gets removed from the UI
            };
            break;
        case "SET_REDIRECT_URL":
            state = {
                ...state,
                redirectAfterLoginURL: action.payload
            };
            break;
        case "LOGIN_USER_FAILED":
            state = {
                ...state,
                isLoggedIn: false,
                errors: action.payload
            };
            break;
        case "LOGOUT_USER_REQUEST":
            state = {
                ...state,
                isLoggedIn: false,
                token: null
            };
            break;
    }
    return state;
};
export default authReducer;