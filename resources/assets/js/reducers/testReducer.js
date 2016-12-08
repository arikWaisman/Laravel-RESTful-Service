const testReducer = (state = {
    name: 'arik',
    age: 26
}, action) => {
    switch (action.type) {
        case "CHANGE_NAME":
            state = {
                ...state,
                name: action.payload
            };
            break;
        case "SUBTRACT_AGE":
            state = {
                ...state,
                age: state.age - action.payload
            };
            break;
    }
    return state;
};
 export default testReducer;