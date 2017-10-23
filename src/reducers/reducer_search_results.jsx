import { SEARCH_SONGS } from '../actions/index';

const dummyResults = [
  {
    id: 4,
    name: 'Result 4',
    artist: 'Artist 4'
  },
  {
    id: 5,
    name: 'Result 5',
    artist: 'Artist 5'
  },
  {
    id: 6,
    name: 'Result 6',
    artist: 'Artist 6'
  }
];

export default function(state = dummyResults, action) {
  switch (action.type) {
    case SEARCH_SONGS:
      console.log(action.payload.tracks.items.slice(0, 5));
      const newResults = action.payload.tracks.items.slice(0, 5).map(song =>{ // to-do: remove slice and add options to limit returned tracks
        return {
          id: song.id,
          name: song.name,
          artist: song.artists[0].name,
          votes: 0
        }
      })
      return newResults;
    default:
      return state;
  } 
}