
/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

//require('./bootstrap');

import React from 'react';
import ReactDom from 'react-dom';

class Test extends React.Component{

    constructor(){
        super();
        this.state = {
            sourceData: {},
            testObj:{
                testArr:  ['one', 'two', 'three']
            }
        };

    }

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

    componentWillMount(){
        this.getData();
    }



    render(){
        return(
            <div>
                hello world
                <br />
                {this.state.sourceData.msg}
                <ol>
                    {this.state.testObj.testArr.map( (key, i) => <li key={i}>{key}</li> ) }
                </ol>
            </div>
        );
    }

}

ReactDom.render(<Test/>,  window.document.getElementById('app') );