import { UPDATE_DEVICES } from '../actions/index';

const initial = [{
  id: 0,
  is_active:false,
  is_restricted:false,
  name: "No Devices Available",
  type:"unknown",
}]

export default function(state = initial, action) {
  switch (action.type) {
    case UPDATE_DEVICES:
      return action.payload;
    default:
      return state;
  } 
}