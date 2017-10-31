import { TOGGLE_SUGGESTION } from '../actions/index';

// Users are not allowed to suggest songs by default

export default function(state = false, action) {
  switch (action.type) {
    case TOGGLE_SUGGESTION:
      return action.payload
    default:
      return state
  } 
}