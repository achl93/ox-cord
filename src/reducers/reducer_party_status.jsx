import { PARTY_STATUS } from '../actions/index';

export default function(state = 'notStarted', action) {
  switch (action.type) {
    case PARTY_STATUS:
      return action.payload;
    default:
      return state;
  } 
}