
/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

//require('./bootstrap');

import React from 'react';
import ReactDom from 'react-dom';

import Component from './components/component';

class Test extends React.Component{

    getInitialData(){

        fetch('http://laravel-rest.dev/api/v1/meeting', { method: 'get' })
        .then( (response) => {
            return response.json();
        })
        .then( (returnedJSON) => {
            console.log(returnedJSON);
            this.setState({
                sourceData: returnedJSON
            });
        })

    }


    render(){
        return(
            <div>
               <Component sourceData={this.getInitialData} />
            </div>
        );
    }

}

ReactDom.render(<Test/>,  window.document.getElementById('app') );