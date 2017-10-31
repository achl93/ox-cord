import { TOGGLE_SUGGESTION } from '../actions/index';

// Users are not allowed to suggest songs by default

export default function(state = {suggestions: false}, action) {
  switch (action.type) {
    case TOGGLE_SUGGESTION:
      if (state === false) {
        state = true;
        return state;
      } else if (state === true) {
        state = false;
        return state;
      }
  } 
}