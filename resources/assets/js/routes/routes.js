import React from "react";
import { Route, IndexRoute } from 'react-router';
import { Provider } from "react-redux";

import Root from "../containers/Root"
import App from "../containers/App";
import Test from "../components/Test";
import Meeting from "../components/Meeting";
import Login from "../containers/Login"
import checkIfLoggedIn from "../containers/checkIfLoggedIn";
import Register from "../containers/Register";
import CreateMeeting from "../containers/CreateMeeting";

import { checkIfUserLoggedIn } from "./route_callbacks";

export default (
    <Route path={"/"} component={Root}>
        <IndexRoute component={App} />
        <Route component={checkIfLoggedIn}>
            <Route path={"test"} component={Test}/>
            <Route path={"create_meeting"} component={CreateMeeting}/>
            <Route path={"update_meeting"} component={CreateMeeting}/>
        </Route>
        <Route path={"meeting/:meetingId"} component={Meeting} />
        <Route path={"login"} component={Login} />
        <Route path={"register"} component={Register} />
    </Route>

);
