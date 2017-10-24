import { ADD_SONG, ADD_SONGS, REMOVE_SONG, IMPORT_PLAYLIST, SET_SONGS, SET_VOTE } from '../actions/index';
const INITIAL = [
  {id: 0,
  name: 'No Songs'}
]

export default function(state = INITIAL, action) {
  switch (action.type) {
    case ADD_SONGS:
      return [...state, ...action.payload]
    //  if (!state.some( item => item.id === action.payload.id ))
    //   {
    //     return [ ...state, action.payload ];
    //   } else {
    //     return state;
    //   }
    case ADD_SONG:
      return [...state, action.payload]

    case IMPORT_PLAYLIST:
      const importedTracks = action.payload.items.map((result) => {
        return {
          id: result.track.id,
          name: result.track.name,
          artist: result.track.artists[0].name,
          votes: 0
        }
      } );
      return [...state, ...importedTracks];  
    case REMOVE_SONG:
      return state.filter(song => song.id !== action.payload);
    case SET_SONGS:
    // console.log("HIIIIIIIIII", action.payload);
      return action.payload;
    case SET_VOTE:
      return state;
    default:
      return state;
  } 
}