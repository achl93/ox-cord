var SpotifyWebApi = require('spotify-web-api-js');
var spotifyApi = new SpotifyWebApi();

export const ADD_SONG = 'ADD_SONG';
export const SEARCH_SONGS = 'SEARCH_SONG';
spotifyApi.setAccessToken('BQAUPDsYu5b3bpY_vNLsYHHCxUKeykZFvknbnshw4WCag-XQKgGZlZjU1YIgbAAaPwGFf-h8-JpHqkLW8h0u4yGdHa4hFauNN9kMw8W7hH_9P2COeGlav5HAJF9Cls7Bq5S9digOx4rQHytAGHW2EAwURy-7IyK74fUSEXNBBh8Rn422u-4dPLg25GbjuVZjflVPsYY2oTJO7f0QXjo57wNvX72aRtWxlE59kNtJAvAV3bC1SxrYsEk1z4RfGwz-UAstCR5fIFMP4F1ckwiPwpSVktl0dCmSCLvusSGS0oG4USeRKBA5XGvQLQ5KQr5_EpH7wu54Uq-ZseVyXw5PnIxMNw');

export function addSong(song) {
  console.log('action fired - add Song')
  return {
    type: ADD_SONG,
    payload: song
  };
}

export function searchSongs(term) {
  //make the request here
  const request = spotifyApi.searchTracks(term);

  return {
    type: SEARCH_SONGS,
    payload: request
  };
}