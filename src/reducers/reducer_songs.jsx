import { ADD_SONG, ADD_SONGS, REMOVE_SONG, IMPORT_PLAYLIST, SET_SONGS, SET_VOTE } from '../actions/index';
const initial = [
  {
    id: 0,
    name: 'No songs',
    votes: 0,
    artist: 'Please add some'
  }
]
function byVotes(a, b) {
  return b.votes - a.votes;
}

export default function(state = initial, action) {
  switch (action.type) {
    case ADD_SONG:
      return [...state, action.payload].sort(byVotes)
    case ADD_SONGS:
      // return [...state, ...action.payload]
      if (state.length > 0) {
        const newSongs = action.payload.filter((song) => {
        return !state.some( item => item.id === action.payload.id )
      })
        return [ ...state, ...newSongs ].sort(byVotes);
      } else {
        return action.payload.sort(byVotes)
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
      return importedTracks.sort(byVotes);  
    case REMOVE_SONG:
      return state.filter(song => song.id !== action.payload).sort(byVotes);
    case SET_SONGS:
      return action.payload.sort(byVotes);
    case SET_VOTE:
      return state.sort(byVotes);
    default:
      return state.sort(byVotes);
  } 
}