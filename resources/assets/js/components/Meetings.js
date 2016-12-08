import React from "react";
import {Link} from 'react-router';

export const Meetings = (props) =>{

    return(
        <div>
            hello world
            <br />
            {props.data.msg}
            <ol>

                { props.data.meetings.map( (meeting, i) => <li key={i} ><Link to={"/meeting/" + meeting.id}>{meeting.title}</Link></li>) }

            </ol>
        </div>
    );


};
