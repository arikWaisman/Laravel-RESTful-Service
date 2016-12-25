import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import {fetchMeeting} from "../actions/meetingAction";
import {registerToMeeting} from"../actions/meetingAction";

class Meeting extends React.Component{

    componentWillMount(){
        const {dispatch} = this.props;
        //if(!this.props.meetingData) {
            fetchMeeting(this.props.params.meetingId, dispatch);
        //}
    }

    registration(){
        let requestToken;
        let userId;
        if(this.props.isLoggedIn){
            requestToken = sessionStorage.getItem('token');
            userId = sessionStorage.getItem('userId');
        }
        registerToMeeting(userId, this.props.params.meetingId, requestToken, this.props.dispatch);

    }

    render(){
        const {isFetching, meetingData} = this.props; //destructuring props which are mapped from the state below... isFetching and meetingData are passed into this component as props
        return(
            <div>
                this is meeting id which is taken from query above: {this.props.params.meetingId}
                {
                    isFetching && <div>fetching data</div>
                }
                { meetingData &&
                <div>
                    <h1>{meetingData.msg}</h1>
                    {!meetingData.meeting.users.some( (user) => { return user.id == this.props.userId; })  ? <button onClick={(e) => this.registration()} >Register to meeting</button> : <h2>You're Registered</h2>}
                    <h3>created at: {meetingData.meeting.created_at}</h3>
                    <h3>description: {meetingData.meeting.description}</h3>
                    <h3>id: {meetingData.meeting.id}</h3>
                    <h3>time: {meetingData.meeting.time}</h3>
                    <h3>title: {meetingData.meeting.title}</h3>
                    <h3>updated at: {meetingData.meeting.updated_at}</h3>
                    <h3>users attending:
                        <ul>
                            {meetingData.meeting.users.map( (user, key) => <li key={key}>{user.name} / {user.email}</li>)}
                        </ul>
                    </h3>
                    {meetingData.meeting.users.some( (user) => { return user.id == this.props.userId; }) && <Link to={"/update_meeting/" + meetingData.meeting.id}><button>Update meeting</button></Link> /*if a user is registered to the meeting show update button*/}
                    {meetingData.meeting.users.length > 0 && meetingData.meeting.users[0].id == this.props.userId && <Link to={"/delete_meeting/" + meetingData.meeting.id}><button>Delete meeting</button></Link> /*only the user who created the meeting (first registered user) should be able to delete*/}
                </div>
                }
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    const{
        isFetching,
        meetingData
        } = state.meetingReducer; //this is destructuring. there is a isFetching and meetingData inside the meetingReducer... call this way will set them rather than defining explicitly
    const {
        userId,
        isLoggedIn
        } = state.authReducer;
    return{
        isFetching,
        meetingData,
        userId,
        isLoggedIn
    }
};

export default connect(mapStateToProps)(Meeting);