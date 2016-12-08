const meetingsReducer = (state = {
    sourceData: []
}, action) => {
    switch (action.type) {
        case "FETCH_ALL_MEETINGS":
            state = {
                ...state,
                sourceData: action.payload.data
            };
            break;
    }
    return state;
};
export default meetingsReducer;