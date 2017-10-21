import { SEARCH_SONGS } from '../actions/index';

const dummyResults = [
  {
    id: 1,
    name: 'Result 1',
    artists: []
  },
  {
    id: 2,
    name: 'Result 2',
    artists: []
  },
  {
    id: 3,
    name: 'Result 3',
    artists: []
  }
];

export default function(state = dummyResults, action) {
  switch (action.type) {
    case SEARCH_SONGS:
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