const meetingReducer = (state = {
    isFetching: false,
    meetingData: null,
    update: false,
    errors: null
}, action) => {
    switch (action.type) {
        case "REQUEST_MEETING":
            state = {
                ...state,
                isFetching: true
            };
            break;
        case "RECEIVE_MEETING":
            state = {
                ...state,
                isFetching: false,
                meetingData: action.payload
            };
        break;
        case "RECEIVE_UPDATED_MEETING_AND_REDIRECT":
            state = {
                ...state,
                isFetching: false,
                meetingData: action.payload,
                errors: null
            };
            break;
        case "REGISTRATION_SUCCESS": //when you register you want the meeting data to have the new users attached to it in the store
            state = {
                ...state,
                isFetching: false,
                meetingData: action.payload
            };
            break;
        case "UNREGISTER_FROM_MEETING_SUCCESS":
            state = {
                ...state,
                isFetching: false,
                meetingData: action.payload
            };
        case "FETCH_MEETING_FAILED":
        case "CREATE_MEETING_FAILED":
        case "UPDATE_MEETING_FAILED":
            state = {
                ...state,
                isFetching: false,
                errors: action.payload
            };
        break;
        case "LOGOUT_USER_REQUEST": //calling this auth action method to clear the token expired method after logging back in
            state = {
                ...state,
                errors: null
            };
        break;
    }
    return state;
};
export default meetingReducer;