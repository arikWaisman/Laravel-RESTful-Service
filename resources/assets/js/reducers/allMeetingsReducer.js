const allMeetingsReducer = (state = {
    allMeetings: null,
    isFetching: false,
    errors: null
}, action) => {
    switch (action.type) {
        case "FETCH_ALL_MEETINGS":
            state = {
                ...state,
                isFetching: true
            };
            break;
        case "RECEIVE_ALL_MEETINGS":
            state = {
                ...state,
                isFetching: false,
                allMeetings: action.payload
            };
            break;
        case "FETCH_ALL_MEETINGS_FAILED":
            state = {
                ...state,
                isFetching: false,
                errors: action.payload
            };
            break;
    }
    return state;
};
export default allMeetingsReducer;