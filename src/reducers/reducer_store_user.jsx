import { STORE_USER } from '../actions/index';

export default function(state = null, action) {
  switch (action.type) {
    case STORE_USER:
    console.log("CHECK CHECK CHECK", action.payload.id);
    //todo: insert token into local storage
      return JSON.stringify(action.payload);
    default:
      return state;
  } 
}