var SpotifyWebApi = require('spotify-web-api-js');
var spotifyApi = new SpotifyWebApi();

export const ADD_SONG = 'ADD_SONG';
export const SEARCH_SONGS = 'SEARCH_SONG';
spotifyApi.setAccessToken('BQAKKOR_e_TWKAp8Euh8FJQTvHDXzcDM5X4InJcxXlpWqPUGiuKW2lGGzbcVYo42xFTLqNzx4LmVAi3THM2tuvEx-H5z8HqmsSkjw9Dp9dvdJ2UyYrbS_B9BrnnmARHUj_y9Df_2ZnDTyCaw1IgAfozChpKaOSIBQEw0WEYT7qFiQ87fhwe4BZohZByhp-QAE8FXBAGPFMELcqnlV9AN-tUwruRUKwbPwgoXtEcUAOObIGYwV2qvZLFPQUhqMby_9ouz7XLHOiQ_mLB5h053mD6YS79epn4qKeQ_KRhOwOYbw-jRbE-TNEXmhrr1PgswNFM4a3khVuuSrc65gxtPaSw5aw');

export function addSong(song) {
  console.log('action fired - add Song')
  return {
    type: ADD_SONG,
    payload: song
  };
}

export function searchSongs(term) {
  console.log('action fired - search song')
  //make the request here
  const request = spotifyApi.searchTracks(term);

  return {
    type: SEARCH_SONGS,
    payload: request
  };
}