
/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import { Meetings } from '../components/Meetings';
import {fetchAllMeetings} from "../actions/allMeetingsReducer";

class App extends React.Component{

    //constructor(){
    //    super();
    //    this.state = {};
    //    //this.getData = this.getData.bind(this);
    //    //this.state = {};
    //
    //}


    loginSubmit(e){

        e.preventDefault();
        axios.post('http://laravel-rest.dev/api/v1/user/signin', {
            email: this.state.email,
            password: this.state.password
        }).then( (response) => {
            console.log(response.data);
        }).catch( (error) => {
            console.log(error.response.data);
            this.setState({
                errors: error.response.data
            })
        });
        //console.log(this.state);

    }

    handleChange(e){

        this.setState({ [e.target.name]: e.target.value });

        console.log(this.state);

    }

    componentWillMount(){
        const { dispatch } = this.props; // this is passed down form the state
        fetchAllMeetings(dispatch);
    }



    render(){
        if( !this.props.allMeetings ) {
            return (
                <div>
                    waiting for data!!!
                    {console.log("i dont have data")}

                </div>
            );
        } else{
            return(
                <div>
                    <Link to={"/test"}><div className="btn btn-primary">Go To Test</div></Link>
                    <form onSubmit={(e) => this.loginSubmit(e)}>
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" onChange={ (e) => this.handleChange(e) }/>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" onChange={ (e) => this.handleChange(e) }/>
                        <button>submit</button>
                    </form>
                    <Meetings data={this.props.allMeetings}/>
                </div>
            );
        }
    }

}

const mapStateToProps = (state) => {
    return{
        allMeetings: state.allMeetingsReducer.allMeetings
    };
};

//this may not be necessary because you can import the action and call as i do in component will mount
//const mapDispatchToProps = (dispatch) => {
//    return {
//        fetchAllMeetings: () => {
//            dispatch( fetchAllMeetings() );
//        }
//    };
//};

export default connect(mapStateToProps)(App);


