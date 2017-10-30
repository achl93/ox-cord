import { STORE_USER } from '../actions/index';

export default function(state = "empty", action) {
  switch (action.type) {
    case STORE_USER:
      return action.payload;
    default:
      return state;
  } 
}