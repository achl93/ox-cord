import { STORE_TOKEN } from '../actions/index';

export default function(state = null, action) {
  switch (action.type) {
    case STORE_TOKEN:
    console.log("IOIOIOIOI", action.payload)
    //todo: insert token into local storage
      return action.payload;
    default:
      return state;
  } 
}