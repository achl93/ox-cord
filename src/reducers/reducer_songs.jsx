import { ADD_SONG } from '../actions/index';
import { REMOVE_SONG } from '../actions/index';

// const dummySongs = [
//   {
//     id: '4V8Sr092TqfHkfAA5fXXqG',
//     name: 'Despacito',
//     artist: 'Luis Fonzi',
//     duration: 320
//   },
//   {
//     id: '5YGY8feqx7naU7z4HrwZM6',
//     name: 'Party In The USA',
//     artist: 'Miley Cyrus',
//     duration: 280
//   },
//   {
//     id: '2YZyLoL8N0Wb9xBt1NhZWg',
//     name: 'HUMBLE',
//     artist: 'Kendrick Lamar',
//     duration: 240
//   }
// ];

export default function(state = [], action) {
  switch (action.type) {
    case ADD_SONG:
      return [ ...state, action.payload ];
    case REMOVE_SONG:
      console.log('removing song:', action.payload)
      return state.filter(song => song.id !== action.payload);
    default:
      return state;
  } 
}