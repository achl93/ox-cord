import { PLAYER_STATUS } from '../actions/index';

const initial = { status: 'UNKNOWN'}

export default function(state = initial, action) {
  switch (action.type) {
    case PLAYER_STATUS:
      return {status: action.payload};
    default:
      return state;
  } 
}