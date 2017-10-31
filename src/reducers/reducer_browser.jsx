import { BROWSER_DEVICE } from '../actions/index';

const initial = {
  type: "unknown"
}

export default function(state = initial, action) {
  switch (action.type) {
    case BROWSER_DEVICE:
      return action.payload;
    default:
      return state;
  } 
}