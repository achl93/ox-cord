import { STORE_TOKEN } from '../actions/index';

export default function(state = null, action) {
  switch (action.type) {
    case STORE_TOKEN:
    console.log("IOIOIOIOI", action.payload)
      return action.payload;
    default:
      return state;
  } 
}