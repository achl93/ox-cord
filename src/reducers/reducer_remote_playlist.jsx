import { UPDATE_REMOTE } from '../actions/index';

const initial = {id: 'NOT_CHECKED', exists: false};
export default function(state = initial, action) {
  switch (action.type) {
    case UPDATE_REMOTE:
      return action.payload;
    default:
      return state;
  } 
}