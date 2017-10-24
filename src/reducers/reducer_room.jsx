import { JOIN_ROOM } from '../actions/index';

export default function(state = {}, action) {
  switch (action.type) {
    case JOIN_ROOM:
      return action.payload;
    default:
      return state;
  } 
}