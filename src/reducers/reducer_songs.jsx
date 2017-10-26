import { ADD_SONG, ADD_SONGS, REMOVE_SONG, IMPORT_PLAYLIST, SET_SONGS, SET_VOTE } from '../actions/index';
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
    case ADD_SONG:
      return [...state, action.payload]
    case ADD_SONGS:
      // return [...state, ...action.payload]
      if (state.length > 0) {
        const newSongs = action.payload.filter((song) => {
        return !state.some( item => item.id === action.payload.id )
      })
        return [ ...state, ...newSongs ];
      } else {
        return action.payload
      }
    case IMPORT_PLAYLIST:
      const importedTracks = action.payload.items.map((result) => {
        return {
          id: result.track.id,
          name: result.track.name,
          artist: result.track.artists[0].name,
          votes: 0,
          cover_art: result.track.album.images[2].url
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