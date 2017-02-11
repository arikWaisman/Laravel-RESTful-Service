import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise";

import testReducer from "./reducers/testReducer";
import allMeetingsReducer from "./reducers/allMeetingsReducer";
import meetingReducer from "./reducers/meetingReducer";
import authReducer from "./reducers/authReducer";
import registerReducer from "./reducers/registerReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore( combineReducers({
    testReducer,
    allMeetingsReducer,
    meetingReducer,
    authReducer,
    registerReducer

}), {}, composeEnhancers(
    applyMiddleware( logger(), thunk)
)); //middlewares go between the action and reducer
//export default createStore(testReducer);//export default createStore(testReducer);