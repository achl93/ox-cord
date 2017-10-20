export const ADD_SONG = 'ADD_SONG';

export function addSong(song) {
  console.log('action fired')
  return {
    type: ADD_SONG,
    payload: song
  };
}