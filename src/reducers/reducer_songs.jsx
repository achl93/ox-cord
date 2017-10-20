import { ADD_SONG } from '../actions/index';

const dummySongs = [
  {
    id: 1,
    title: 'Hips Don\'t Lie',
    artist: 'Shakira',
    duration: 320
  },
  {
    id: 2,
    title: 'HUMBLE',
    artist: 'Kendrick Lamar',
    duration: 280
  },
  {
    id: 3,
    title: 'Jingle Bells',
    artist: 'Me',
    duration: 240
  }
];

export default function(state = dummySongs, action) {
  switch (action.type) {
    case ADD_SONG:
      return [ action.payload, ...state ];
    default:
      return state;
  } 
}