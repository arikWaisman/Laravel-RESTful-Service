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
        case "FETCH_MEETING_FAILED":
        case "CREATE_MEETING_FAILED":
            state = {
                ...state,
                isFetching: false,
                errors: action.payload
            };
        break;
    }
    return state;
};
export default meetingReducer;