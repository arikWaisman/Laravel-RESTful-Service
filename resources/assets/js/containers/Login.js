import React from "react";
import {connect} from 'react-redux';
import {loginGetToken, logout} from '../actions/authActions';
import {Input} from "../components/Input"

class Login extends React.Component {

    constructor(){
        super();
        this.state = {}; //to track local the local form data and send to the action
    }

    handleChange(e){
        console.log(this.state);
        this.setState({ [e.target.name]: e.target.value });

    }

    loginSubmit(e){

        e.preventDefault();
        loginGetToken(this.state, this.props.dispatch); //you pass in the dispatch available into this component rather than the "dispatch" in the action because it emits an action of its own. this prevents that


    }



    render(){
        let errors, msg;
        //this was taken out of the intial state to ensure reliable rendering of errors...
        //it now can only exist if the "LOGIN_FAILED" action is fired. if it never is fired its false and the errors never display
        if(this.props.errors){
            errors = <div className="alert alert-danger">
                    {
                        Object.keys(this.props.errors).map( (key, i) => {
                            //if( document.getElementsByClassName('alert-danger') ){
                            //    document.getElementsByClassName('alert-danger').classList.remove("alert-danger");
                            //}
                            //document.getElementById(key).className = 'alert-danger';
                            return <p key={i}> {key}: {this.props.errors[key]}</p>;
                        })
                    }
                    </div>
        }

        if(this.props.msg){
            msg = <div className="alert alert-success">{this.props.msg}</div>
        }

        return(
            <div>
                {msg}
                {errors}
                <form onSubmit={(e) => this.loginSubmit(e)}>
                    <Input type={"text"} name={"email"} label={"email"} handleChange={ (e) => this.handleChange(e) }/>
                    <Input type={"password"} name={"password"} label={"password"} handleChange={ (e) => this.handleChange(e) }/>
                    <button>submit</button>
                </form>
                <button onClick={ () => logout(this.props.dispatch) }>Logout</button>
            </div>
        );
    }

}

const mapStateToProps = (state) => {

    const {
        isLoggedIn,
        errors, //this was taken out of the intial state to ensure the check in the render function worked for displaying errors
        token
        } = state.authReducer;
    const {
        msg
        } = state.registerReducer;
    return{
        isLoggedIn,
        errors,
        token,
        msg
    }

};

export default connect(mapStateToProps)(Login);