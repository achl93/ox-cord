import { SEARCH_SONGS } from '../actions/index';


export default function (state = [], action) {
  switch (action.type) {
    case SEARCH_SONGS:
      // If search is empty, return an item that tells the user nothing found
      if (action.payload === undefined) { 
        return [{
          id: 1,
          name: 'No Song Found',
          artist: 'No Artist Found',
          votes: 0,
          cover_art: 'https://cdn4.iconfinder.com/data/icons/cloudcon-v2/512/cloud-22-64.png',
          playing: false
        }]
      }
      return action.payload;
    default:
      return state;
  }
}