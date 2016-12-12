import React from "react";
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

//This component is used so all routes can be nested under it the root path... it will render child components with the routes after /whatever
class Root extends React.Component{

    componentDidUpdate(prevProps){ //these will fire when the props change, which will happen as isLoggedIn goes from true to false or vice versa
        const { dispatch, redirectAfterLoginURL, token, userId} = this.props;
        const userCreationSuccess = !prevProps.userCreated && this.props.userCreated;
        const isLoggingOut = prevProps.isLoggedIn && !this.props.isLoggedIn;
        const isLoggingIn = !prevProps.isLoggedIn && this.props.isLoggedIn;

        if(userCreationSuccess){
            dispatch({type: "USER_CREATED_REDIRECT_TO_LOGIN"});
            browserHistory.replace('/login');
        }

        if(isLoggingIn){

            sessionStorage.setItem('token', token); //I put the session here rather than the reducer to ensure i was setting and removing it in the same place. if it exists in state it'll exist in the session
            sessionStorage.setItem('userId', userId); //storing this in session so it surface hard entered urls
            browserHistory.replace(redirectAfterLoginURL); //the default is set in initial state in login reducer

        } else if(isLoggingOut) {

            sessionStorage.removeItem('token');
            sessionStorage.removeItem('userId');
            dispatch({
                type: "LOGOUT_USER_SUCCESS"
            });
            browserHistory.replace('/register');

        }

    }

    render(){
        return(
            <div>
                {this.props.children}
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    const {
        isLoggedIn,
        redirectAfterLoginURL,
        token,
        userId
        } = state.authReducer;
    const {
        userCreated
        } = state.registerReducer;
    return { isLoggedIn, redirectAfterLoginURL, token, userCreated, userId }
};

export default connect(mapStateToProps)(Root)