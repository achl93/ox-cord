import { ADD_SONG, ADD_SONGS, REMOVE_SONG, IMPORT_PLAYLIST } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
    case ADD_SONG:
      return [ ...state, action.payload ];
    case ADD_SONGS:
      return [ ...state, ...action.payload ];
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
    default:
      return state;
  } 
}