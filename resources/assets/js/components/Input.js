import React from "react";

export const Input = (props) => {
    return(
        <div>
            <label htmlFor={props.name}>{props.label}</label>
            <input type={props.type} id={props.name} name={props.name} onChange={ (e) => props.handleChange(e) }/>
        </div>
    );
};