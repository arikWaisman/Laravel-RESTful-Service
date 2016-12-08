require("./bootstrap/bootstrap");
import React from "react";
import { Router, browserHistory } from 'react-router';
import { render } from "react-dom";
import { Provider } from "react-redux";

import store from "./store"
import routesHook from "./routes/routes";


render(<Provider store={store}>
            <Router history={browserHistory} routes={routesHook}/>
        </Provider>, window.document.getElementById('app'));