import React from "react";
import { connect } from "react-redux";

import { changeName, subtractAge} from "../actions/testAction"

class Test extends React.Component{

    render(){
        return(
            <div>
                <h1>testing routes this is a test component</h1>
                <p>My name is: {this.props.test.name}</p>
                <p>my age is: {this.props.test.age}</p>
                <button onClick={ () => this.props.testDifference('1') }>subtract age</button>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return{
        test: state.testReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return{
        testDifference: (difference) => {
            dispatch( subtractAge(difference) )
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Test)