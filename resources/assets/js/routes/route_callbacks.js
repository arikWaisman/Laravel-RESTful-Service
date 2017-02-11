import store from '../store';
import {browserHistory} from 'react-router';
import { fetchAllMeetings } from "../actions/allMeetingsReducer";

////this gets called to pre-load the app with data on the route
//export function onMeetingsEnter(){
//
//    store.dispatch(fetchAllMeetings());
//
//}

export const checkIfUserLoggedIn = () => {

   if( !sessionStorage.getItem('token') ){
       browserHistory.replace('/login');
   }

};
