export function changeName(newName){

    return {
        type: "CHANGE_NAME",
        payload: newName
    };

}

export function subtractAge(difference){
    return{
        type: "SUBTRACT_AGE",
        payload: difference
    };
}