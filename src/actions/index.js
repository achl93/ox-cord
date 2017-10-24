import socket from '../lib/SocketAPI';
const SpotifyWebApi = require('spotify-web-api-js');
const spotifyApi = new SpotifyWebApi();

export const ADD_SONG = 'ADD_SONG';
export const ADD_SONGS = 'ADD_SONGS';
export const IMPORT_PLAYLIST = 'IMPORT_PLAYLIST';
export const UPDATE_REMOTE = 'UPDATE_REMOTE';
export const REMOVE_SONG = 'REMOVE_SONG';
export const SEARCH_SONGS = 'SEARCH_SONGS';
export const GET_PLAYLISTS = 'GET_PLAYLISTS';
export const STORE_TOKEN = 'ADD_TOKEN';
export const GET_GEO = 'GET_GEO';
export const STORE_USER = 'STORE_USER';
export const PLAYER_STATUS = 'PLAYER_STATUS';

export function addSong(song) {
  return {
    type: ADD_SONG,
    payload: song
  };
}

export function addSongs(tracks) {
  return {
    type: ADD_SONGS,
    payload: tracks
  };
}
export function remoteAddSongs(userID, remotePlaylistID, tracks) {
  const tracksString = tracks.map((track) => {
    return `spotify:track:${track.id}`
  }).join();
  console.log('making api request')
  console.log('user:', userID)
  console.log('playlist:', remotePlaylistID)
  console.log('tracks:', tracksString)
  return (dispatch) => {
    spotifyApi.addTracksToPlaylist(userID, remotePlaylistID, [tracksString])
      .then(() => {
        console.log('song added successfully')
        dispatch(addSongs(tracks));
      })
  }
}

export function remoteRemoveSongs(userID, remotePlaylistID, tracks) {
  const tracksString = tracks.map((track) => {
    return `spotify:track:${track.id}`
  }).join();
  console.log('making api request')
  console.log('user:', userID)
  console.log('playlist:', remotePlaylistID)
  console.log('tracks:', tracksString)
  return (dispatch) => {
    spotifyApi.removeTracksFromPlaylist(userID, remotePlaylistID, [tracksString])
      .then(() => {
        console.log('song removed successfully')
        dispatch(removeSong(tracks[0].id)); // assumes only one song is being removed
      })
  }
}

export function importPlaylist(userID, playlistID) {
  const request = spotifyApi.getPlaylistTracks(userID, playlistID);
  return {
    type: IMPORT_PLAYLIST,
    payload: request
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

export function getUserPlaylists(playlists) {
  return {
    type: GET_PLAYLISTS,
    payload: playlists
  }
};

export function remoteGetUserPlaylists(userID) {
  return (dispatch) => {
    spotifyApi.getUserPlaylists(userID).then(
      (results) => {
        dispatch(getUserPlaylists(results))
      }
    )
  }
}

export function checkRemotePlaylist(remotePlaylist) {
  console.log('event triggered checkRemotePlaylist');
  console.log(remotePlaylist)
  return {
    type: UPDATE_REMOTE,
    payload: remotePlaylist
  }
}

export function remoteCheckRemotePlaylists(userID) {
  console.log('event triggered remoteCheckRemotePlaylist');
  return (dispatch) => {
    spotifyApi.getUserPlaylists(userID).then((results) => {
      // check for name 'Oxcord'
      const found = results.items.find(playlist => playlist.name === 'Oxcord');
      let result;
      if (found){
        result = {
          id: found.id,
          exists: true
        }
      } else {
        result = {
          id: 'NOT_FOUND',
          exists: false
        }
      }
      dispatch(checkRemotePlaylist(result));
    });
  }
}

export function createRemotePlaylist(newRemotePlaylist) {
  console.log('event triggered createRemotePlaylist');
  console.log(newRemotePlaylist)
  return {
    type: UPDATE_REMOTE,
    payload: newRemotePlaylist
  }
}

export function remoteCreateRemotePlaylist(userID) {
  console.log('event triggered remoteCreateRemotePlaylist');
  return (dispatch) => {
  spotifyApi.createPlaylist(userID, {name: 'Oxcord', public: true, description: 'Playlist created by Oxcord'})
    .then((createdPlaylist) => {
      const result = {
        id: createdPlaylist.id,
        exists: true
      }
      dispatch(createRemotePlaylist(result));
    })
  }
}

// start remote Playlis from beginning
export function remoteStartPlaylist( userID, remotePlaylistID) {
  console.log('sending  start playlist request')
  const context_uri = `spotify:user:${userID}:playlist:${remotePlaylistID}`;
  return (dispatch) => {
    spotifyApi.play({context_uri})
    .then( () => {
      dispatch(play())
    })
  }
}


// start or resume playback
export function play() {
  console.log('play successful')
  return {
    type: PLAYER_STATUS,
    payload: 'PLAY'
  }
}

export function remotePlay() {
  console.log('sending play request')
  return (dispatch) => {
    spotifyApi.play({})
    .then( () => {
      dispatch(play())
    })
  }
}
// start or resume playback
export function pause() {
  console.log('pause successful')
  return {
    type: PLAYER_STATUS,
    payload: 'PAUSE'
  }
}

export function remotePause() {
  console.log('sending play request')
  return (dispatch) => {
    spotifyApi.pause({})
    .then(() => {
      dispatch(pause())
    })
  }
}

export function skip() {
  console.log('skip successful')
  //this part doesn
  return {
    type: PLAYER_STATUS,
    payload: 'PLAY'
  }
}

export function remoteSkip() {
  console.log('sending skip request')
  return (dispatch) => {
    spotifyApi.skipToNext({})
      .then(() => {
        dispatch(skip()) 
      });
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