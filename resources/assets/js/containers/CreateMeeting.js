import React from "react";
import {connect} from  "react-redux";
import {createNewMeeting} from "../actions/meetingAction";
import {Input} from "../components/Input";

class CreateMeeting extends React.Component {

    constructor(){
        super();
        this.state = {}; //to track local the local form data and send to the action
    }

    handleChange(e){
        console.log(this.state);
        this.setState({ [e.target.name]: e.target.value });

    }

    createMeeting(e){

        e.preventDefault();
        let requestToken;
        if(this.props.isLoggedIn){
            requestToken = sessionStorage.getItem('token');
        }
        createNewMeeting(this.state, requestToken, this.props.dispatch); //you pass in the dispatch available into this component rather than the "dispatch" in the action because it emits an action of its own. this prevents that


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
                { this.props.router.isActive('create_meeting') &&
                    <form onSubmit={(e) => this.createMeeting(e)}>
                        <Input type={"text"} name={"title"} label={"title"} handleChange={ (e) => this.handleChange(e) }/>
                        <Input type={"text"} name={"time"} label={"time"} handleChange={ (e) => this.handleChange(e) }/>
                        <Input type={"textarea"} name={"description"} label={"description"} handleChange={ (e) => this.handleChange(e) }/>
                        <button>Create New Meeting</button>
                    </form>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
      errors: state.meetingReducer.errors,
      isLoggedIn: state.authReducer.isLoggedIn
      }
};

export default connect(mapStateToProps)(CreateMeeting);