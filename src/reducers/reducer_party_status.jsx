import { PARTY_STATUS } from '../actions/index';

export default function(state = {started: false}, action) {
  switch (action.type) {
    case PARTY_STATUS:
      return action.payload;
    default:
      return state;
  } 
}