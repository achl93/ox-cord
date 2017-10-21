import { GET_GEO } from '../actions/index';

const dummy_coords = {
  longitude: 11111,
  latitude: 22222
}

export default function(state = dummy_coords, action) {
  switch (action.type) {
    case GET_GEO:
      return action.payload;
    default:
      return state;
  } 
}