
/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

import React from 'react';
import { Router, Route, browserHistory,IndexRoute, Link } from 'react-router';

import axios from 'axios';
import { Meetings } from '../components/Meetings';

 export class App extends React.Component{

    constructor(){
        super();
        this.state = {}; //local component state to track form inputs
        //this.getData = this.getData.bind(this);
        //this.state = {};

    }

    getData(){

        //fetch('http://laravel-rest.dev/api/v1/meeting', { method: 'get' })
        //    .then( (response) => {
        //        return response.json();
        //    })
        //    .then( (returnedJSON) => {
        //        console.log(returnedJSON);
        //        this.setState({sourceData: returnedJSON});
        //        //return returnedJSON;
        //    });

        axios.get('http://laravel-rest.dev/api/v1/meeting').then( (response) => {
            this.setState({ sourceData: response.data });
            //return response.data;
        });

    }

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

    componentWillMount(){
        this.getData()
    }



    render(){

        if( !this.state.sourceData ){
            return(
                <div>
                    waiting for data!!!
                    {console.log("i dont have data")}

                </div>
            );
        } else {
            return (
                <div>
                    <Link to={"/test"}><div className="btn btn-primary">Go To Test</div></Link>
                    { console.log( this.state.errors) }
                    <form onSubmit={(e) => this.loginSubmit(e)}>
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" onChange={ (e) => this.handleChange(e) }/>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" onChange={ (e) => this.handleChange(e) }/>
                        <button>submit</button>
                    </form>
                    <Meetings sourceData={this.state.sourceData}/>
                </div>
            );
        }
    }

}

