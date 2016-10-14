
/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

//require('./bootstrap');

import React from 'react';
import ReactDom from 'react-dom';

const app = window.document.getElementById('app');

class Test extends React.Component{

    render(){
        return(
            <div>
                hello world
            </div>
        );
    }

}

ReactDom.render(<Test/>,  window.document.getElementById('app') );