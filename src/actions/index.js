import socket from '../lib/SocketAPI';
const SpotifyWebApi = require('spotify-web-api-js');
const spotifyApi = new SpotifyWebApi();

export const ADD_SONG = 'ADD_SONG';
export const IMPORT_PLAYLIST = 'IMPORT_PLAYLIST';
export const REMOVE_SONG = 'REMOVE_SONG';
export const SEARCH_SONGS = 'SEARCH_SONGS';
export const GET_PLAYLISTS = 'GET_PLAYLISTS';
export const STORE_TOKEN = 'ADD_TOKEN';
export const GET_GEO = 'GET_GEO';
export const STORE_USER = 'STORE_USER';
export const PLAY_SONG = 'PLAY_SONG';

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
  const request = spotifyApi.searchTracks(term, {limit: 5});
  return {
    type: SEARCH_SONGS,
    payload: request
  }
};

export function getPlaylists(userID) {
  console.log('getPlaylists action dispatched')
  //make the request here
  const request = spotifyApi.getUserPlaylists(userID);
  return {
    type: GET_PLAYLISTS,
    payload: request
  }
};

export function importPlaylist(userID, playlistID) {
  const request = spotifyApi.getPlaylistTracks(userID, playlistID);
  return {
    type: IMPORT_PLAYLIST,
    payload: request
  };
}

export function playSong(song) {
  const request = spotifyApi.play(song);
  // request is a promise object
  console.log('playing song');
  console.log(request);
  return {
    type: PLAY_SONG,
    payload: request
  }
}

export function storeToken(token) {
  spotifyApi.setAccessToken(token);
  return {
    type: STORE_TOKEN,
    payload: token
  }
};

export function storeUser() {
  const user = spotifyApi.getMe();
  return {
    type: STORE_USER,
    payload: user
  }
};

export function getGeo(coords) {
  return {
    type: GET_GEO,
    payload: coords
  }
};