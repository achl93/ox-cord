import { UPDATE_NOW_PLAYING } from '../actions/index';

const initial = { id: 0, name: 'Nothing Playing Yet!', artist: 'Please wait for the Host to start the party!', cover_art: 'http://eskipaper.com/images/black-robot-bull-1.jpg', cover_background: 'http://eskipaper.com/images/black-robot-bull-1.jpg' }

export default function(state = initial, action) {
  switch (action.type) {
    case UPDATE_NOW_PLAYING:
      return action.payload;
    default:
      return state;
  } 
}