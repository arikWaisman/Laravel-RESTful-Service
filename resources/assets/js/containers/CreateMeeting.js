import React from "react";
import {connect} from  "react-redux";
import {browserHistory} from "react-router";
import {createNewMeeting, updateMeeting, fetchMeeting} from "../actions/meetingAction";
import {Input} from "../components/Input";

class CreateMeeting extends React.Component {

    constructor(props){
        super(props); //this ensures that the props are passed down from outside this component? in this case meeting?
        if(this.props.meetingData){
            this.state = {
                ...this.props.meetingData.meeting
            };
        }
    }

    componentWillMount() {

        if (!this.props.router.isActive('create_meeting')) {//only fire if the url isnt create_meeting
            if (!this.props.meetingData) {
                const {dispatch} = this.props;
                fetchMeeting(this.props.params.meetingId, dispatch);
            }
        }

    }

    componentWillReceiveProps(nextProps){ //this ensures state is populated and exists for hard entered urls
        this.setState({...nextProps.meetingData.meeting});
    }

    redirectIfNotAuthToUpdate(){

        if( !this.props.router.isActive('create_meeting') ){//only fire if the url isnt create_meeting
            const {meetingData} = this.props;
            let authUserToUpdate = meetingData.meeting.users.some((user) =>  user.id == this.props.userId);
            if (authUserToUpdate != true) {
                browserHistory.replace('/meeting/' + this.props.params.meetingId);
            }
            return authUserToUpdate; //return true if you are allowed to update the meeting
        }

    }

    handleChange(e){
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state);


    }

    createMeetingSubmit(e){

        e.preventDefault();
        let requestToken;
        if(this.props.isLoggedIn){
            requestToken = sessionStorage.getItem('token');
        }
        createNewMeeting(this.state, requestToken, this.props.dispatch); //you pass in the dispatch available into this component rather than the "dispatch" in the action because it emits an action of its own. this prevents that


    }

    updateMeetingSubmit(e){
        e.preventDefault();
        //
        //let formData;
        //for(let i = 0; i < e.target.elements.length; i++){ //this loop is to catch the update if there is no user interaction with form fields. it will be submitted with what is prepopulated
        //
        //    let element = e.target.elements[i];
        //
        //    if(element.localName == 'input') {
        //       this.setState({ [element.name] : element.value }, () => {
        //           console.log(this.state);
        //       });
        //
        //    }
        //
        //}


        let requestToken;
        if(this.props.isLoggedIn){
            requestToken = sessionStorage.getItem('token');
        }
        updateMeeting(this.state, requestToken, this.props.params.meetingId,  this.props.dispatch);

    }

    render(){
        const {meetingData} = this.props;

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
                {this.props.router.isActive('create_meeting') &&
                    <form onSubmit={(e) => this.createMeetingSubmit(e)}>
                        <Input type={"text"} name={"title"} label={"title"} handleChange={ (e) => this.handleChange(e) }/>
                        <Input type={"text"} name={"time"} label={"time"} handleChange={ (e) => this.handleChange(e) }/>
                        <Input type={"textarea"} name={"description"} label={"description"} handleChange={ (e) => this.handleChange(e) }/>
                        <button>Create New Meeting</button>
                    </form>
                }
                {
                this.props.routeParams.meetingId && /*if there are route parameters it means im passing an id to a specific meeting to update*/
                meetingData &&
                this.redirectIfNotAuthToUpdate() &&
                <form id="updateForm" onSubmit={(e) => this.updateMeetingSubmit(e)}>
                    <Input type={"text"} name={"title"} label={"title"} value={ this.state.title } handleChange={ (e) => this.handleChange(e) }/>
                    <Input type={"text"} name={"time"} label={"time"}  value={this.state.time} handleChange={ (e) => this.handleChange(e) }/>
                    <Input type={"textarea"} name={"description"} label={"description"}  value={this.state.description} handleChange={ (e) => this.handleChange(e) }/>
                    <button>Update Meeting</button>
                </form>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        errors,
        meetingData
        } =  state.meetingReducer;
    const {
        isLoggedIn,
        userId
        } = state.authReducer;
  return {
      errors,
      meetingData,
      isLoggedIn,
      userId
      }
};

export default connect(mapStateToProps)(CreateMeeting);