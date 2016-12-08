import React from 'react';
import {connect} from 'react-redux';
import {createNewUser} from '../actions/registerActions'

import { Input } from '../components/Input';

class Register extends React.Component {

    constructor(){
        super();
        this.state = {}; //to track local the local form data and send to the action
    }

    handleChange(e){
        console.log(this.state);
        this.setState({ [e.target.name]: e.target.value });

    }

    createUser(e){

        e.preventDefault();
        createNewUser(this.state, this.props.dispatch); //you pass in the dispatch available into this component rather than the "dispatch" in the action because it emits an action of its own. this prevents that


    }

    render(){
        let errors;
        //this was taken out of the intial state to ensure reliable rendering of errors...
        //it now can only exist if the "CREATE_USER_FAILED" action is fired. if it never is fired its false and the errors never display
        if(this.props.errors){
            errors = <div className="alert alert-danger">
                {
                    Object.keys(this.props.errors).map( (key, i) => {
                        return <p key={i}> {key}: {this.props.errors[key]}</p>;
                    })
                }
            </div>
        }
        return(
            <div>
                {errors}
                <form onSubmit={(e) => this.createUser(e)} >
                    <Input type={"text"} name={"name"} label={"name"} handleChange={ (e) => this.handleChange(e) }/>
                    <Input type={"text"} name={"email"} label={"email"} handleChange={ (e) => this.handleChange(e) }/>
                    <Input type={"password"} name={"password"} label={"password"} handleChange={ (e) => this.handleChange(e) }/>
                    <button>submit</button>
                </form>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    const {msg, errors} = state.registerReducer;
    return {msg, errors};
};
export default connect(mapStateToProps)(Register)