import { SEARCH_SONGS } from '../actions/index';

const dummyResults = [
  {
    id: 4,
    name: 'Result 4',
    artists: []
  },
  {
    id: 5,
    name: 'Result 5',
    artists: []
  },
  {
    id: 6,
    name: 'Result 6',
    artists: []
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
          artists: song.artists
        }
      })
      return newResults;
    default:
      return state;
  } 
}