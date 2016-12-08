const registerReducer = ( state = {
    userCreated: null,
    msg: null,
    errors: null
}, action) => {
    switch(action.type) {
        case "CREATE_USER_SUCCESS":
            state = {
                ...state,
                msg: action.payload,
                userCreated: true
            };
        break;
        case "CREATE_USER_FAILED":
            state = {
                ...state,
                errors: action.payload
            };
            break;
        case "REQUEST_USER_TOKEN": //this is an auth action, but i am listening for it here as well to only show the success msg on the login page once and remove userCreated incase you need to create another user. neither should exist after sending login requests
            state = {
                ...state,
                userCreated: null,
                msg: null
            };
        break;
    }
    return state;
};

export default registerReducer;