import { UPDATE_NOW_PLAYING } from '../actions/index';

const initial = { id: 0, name: 'unknown', cover_background: 'http://eskipaper.com/images/black-robot-bull-1.jpg' }

export default function(state = initial, action) {
  switch (action.type) {
    case UPDATE_NOW_PLAYING:
      return action.payload;
    default:
      return state;
  } 
}