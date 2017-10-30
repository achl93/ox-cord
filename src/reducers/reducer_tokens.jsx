import { STORE_TOKEN } from '../actions/index';

const initial = {
  access_token: 'none',
  refresh_token: 'none',
  create_at: null
}
export default function(state = initial, action) {
  switch (action.type) {
    case STORE_TOKEN:
      return action.payload;
    default:
      return state;
  } 
}