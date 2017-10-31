import { SEARCH_SONGS } from '../actions/index';


export default function (state = [], action) {
  switch (action.type) {
    case SEARCH_SONGS:
      // If search is empty, return an item that tells the user nothing found
      if (action.payload.tracks === undefined) { 
        return [{
          id: 1,
          name: 'No Song Found',
          artist: 'No Artist Found',
          votes: 0,
          cover_art: 'https://cdn4.iconfinder.com/data/icons/cloudcon-v2/512/cloud-22-64.png',
          playing: false
        }]
      }
      const newResults = action.payload.tracks.items.map(track => {
        return {
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          votes: 0,
          cover_art: track.album.images[2].url,
          playing: false
        }
      })
      return newResults;
    default:
      return state;
  }
}