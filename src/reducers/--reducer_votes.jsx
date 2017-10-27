import { ADD_VOTE, MINUS_VOTE } from '../actions/index';

const initial = 5

export default function(state = initial, action) {
  switch (action.type) {
    case ADD_VOTE:
      return state - 1;
    case MINUS_VOTE:
      return state - 1;
    default:
      return state;
  } 
}