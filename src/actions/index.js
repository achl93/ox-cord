var SpotifyWebApi = require('spotify-web-api-js');
var spotifyApi = new SpotifyWebApi();

export const ADD_SONG = 'ADD_SONG';
export const REMOVE_SONG = 'REMOVE_SONG';
export const SEARCH_SONGS = 'SEARCH_SONG';
export const STORE_TOKEN = 'ADD_TOKEN';
export const GET_GEO = 'GET_GEO';
export const STORE_USER = 'STORE_USER';


export function addSong(song) {
  return {
    type: ADD_SONG,
    payload: song
  };
}

export function removeSong(id) {
  return {
    type: REMOVE_SONG,
    payload: id
  };
}

export function searchSongs(term) {
  //make the request here
  const request = spotifyApi.searchTracks(term);
  return {
    type: SEARCH_SONGS,
    payload: request
  }
};

export function storeToken(token) {
  spotifyApi.setAccessToken(token);
  return {
    type: STORE_TOKEN,
    payload: token
  }
};

export function storeUser() {
  const user_id = spotifyApi.getMe();
  return {
    type: STORE_USER,
    payload: user_id
  }
};

export function getGeo(coords) {
  return {
    type: GET_GEO,
    payload: coords
  }
};