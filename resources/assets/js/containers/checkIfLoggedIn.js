import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {setRedirectUrl} from '../actions/authActions'

//everything nested under this components set route will be protected by auth
class checkIfLoggedIn extends React.Component {

    componentWillMount(){

        const {dispatch, currentURL} = this.props;
        if(!this.props.isLoggedIn){
            dispatch( setRedirectUrl(currentURL) );
            browserHistory.replace('/login');
        }

    }

    render(){

        if(this.props.isLoggedIn) {
            return this.props.children;
        } else {
            return null;
        }

    }

}

const mapStateToProps = (state, ownProps) => {

    const {isLoggedIn} = state.authReducer;
    return {
        isLoggedIn,
        currentURL: ownProps.location.pathname
    }

};

export default connect(mapStateToProps)(checkIfLoggedIn);