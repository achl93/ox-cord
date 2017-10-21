import { PLAY_SONG } from '../actions/index';

export default function(state = {}, action) {
  switch (action.type) {
    case PLAY_SONG:
      // TODO: return name of new song to state
      return state;
    default:
      return state;
  } 
}