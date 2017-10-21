import { ADD_SONG } from '../actions/index';

const dummySongs = [
  {
    id: 1,
    name: 'Song 1',
    artist: 'Artist 1',
    duration: 320
  },
  {
    id: 2,
    name: 'Song 2',
    artist: 'Artist 2',
    duration: 280
  },
  {
    id: 3,
    name: 'Song 3',
    artist: 'Artist 3',
    duration: 240
  }
];

export default function(state = dummySongs, action) {
  switch (action.type) {
    case ADD_SONG:
      return [ ...state, action.payload ];
    default:
      return state;
  } 
}