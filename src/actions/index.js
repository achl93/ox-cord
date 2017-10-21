export const ADD_SONG = 'ADD_SONG';
export const STORE_TOKEN = 'ADD_TOKEN';

export function addSong(song) {
  console.log('action fired')
  return {
    type: ADD_SONG,
    payload: song
  };
}

export function storeToken(token) {
  console.log("MNMNMNMNMNMMN", token);
  return {
    type: STORE_TOKEN,
    payload: token
  };
}