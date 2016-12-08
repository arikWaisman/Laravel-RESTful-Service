import React from "react";
import {connect} from "react-redux";
import {fetchMeeting} from "../actions/meetingAction";

class Meeting extends React.Component{

    componentWillMount(){
        const {dispatch} = this.props;
        fetchMeeting(this.props.params.meetingId, dispatch);
    }

    render(){
        const {isFetching, meetingData} = this.props; //destructuring props which are mapped from the state below... isFetching and meetingData are passed into this component as props
        //const isEmpty = meetingData.length === 0; //this is false unless there is data available
        return(
            <div>
                this is meeting id which is taken from query above: {this.props.params.meetingId}
                {
                    isFetching && <div>fetching data</div>
                }
                { meetingData &&
                <div>
                    <h1>{meetingData.msg}</h1>
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
    return{
        isFetching,
        meetingData
    }
};

export default connect(mapStateToProps)(Meeting);