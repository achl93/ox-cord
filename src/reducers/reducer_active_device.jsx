import { UPDATE_ACTIVE_DEVICE } from '../actions/index';

const initial = {
  id: 0,
  is_active:false,
  is_restricted:false,
  name: "No Device Active",
  type:"unknown",
}

export default function(state = initial, action) {
  switch (action.type) {
    case UPDATE_ACTIVE_DEVICE:
      return action.payload;
    default:
      return state;
  } 
}