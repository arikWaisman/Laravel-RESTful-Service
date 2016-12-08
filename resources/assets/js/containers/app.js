
/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import { Meetings } from '../components/Meetings';
import {fetchAllMeetings} from "../actions/meetingsAction";

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

    displayErrors(errors){

    }

    handleChange(e){

        this.setState({ [e.target.name]: e.target.value });

        console.log(this.state);

    }
    //
    componentWillMount(){
        const { dispatch } = this.props; // this is passed down form the state
        dispatch( fetchAllMeetings() );
    }



    render(){
        if( this.props.sourceData == 0 ) {
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
                    <Meetings data={this.props.sourceData}/>
                </div>
            );
        }
    }

}

const mapStateToProps = (state) => {
    return{
        sourceData: state.meetingsReducer.sourceData
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


