import { ADD_SONG, REMOVE_SONG, IMPORT_PLAYLIST, SET_SONGS, SET_VOTE } from '../actions/index';
const initial = [
  {
    id: 0,
    name: 'No songs',
    votes: 0,
    artist: 'Please add some'
  }
]

export default function(state = initial, action) {
  switch (action.type) {
    // case ADD_SONGS:
    //   // return [...state, ...action.payload]
    //  if (!state.some( item => item.id === action.payload.id ))
    //   {
    //     return [ ...state, action.payload ];
    //   } else {
    //     return state;
    //   }
    case ADD_SONG:
      return [...state, action.payload]
      // if (!state.some( item => item.id === action.payload.id ))
      // {
      //   return [ ...state, action.payload ];
      // } else {
      //   return state;
      // }
    case IMPORT_PLAYLIST:
      const importedTracks = action.payload.items.map((result) => {
        return {
          id: result.track.id,
          name: result.track.name,
          artist: result.track.artists[0].name,
          votes: 0
        }
      } );
      return importedTracks;  
    case REMOVE_SONG:
      return state.filter(song => song.id !== action.payload);
    case SET_SONGS:
      return action.payload;
    case SET_VOTE:
      return state;
    default:
      return state;
  } 
}