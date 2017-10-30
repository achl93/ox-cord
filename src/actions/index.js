import socket from '../lib/SocketAPI';
import SpotifyWebApi from 'spotify-web-api-js';
import EventEmitter from 'events';
import querystring from 'querystring';
// import CheckNowPlaying from '../lib/CheckNowPlaying';

const spotifyApi = new SpotifyWebApi();

export const PARTY_STATUS = 'PARTY_STATUS';
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
export const JOIN_ROOM = 'JOIN_ROOM';
export const SET_SONGS = 'SET_SONGS';
export const PLAYER_STATUS = 'PLAYER_STATUS';
export const UPDATE_NOW_PLAYING = 'UPDATE_NOW_PLAYING';
export const UPDATE_ACTIVE_DEVICE = 'UPDATE_ACTIVE_DEVICE';
export const UPDATE_DEVICES = 'UPDATE_DEVICES';
export const SET_VOTE = 'SET_VOTE';
// export const ADD_VOTE = 'ADD_VOTE';
// export const MINUS_VOTE = 'MINUS_VOTE';
export const SET_TO_PLAYING = 'SET_TO_PLAYING';

let tokenSet = false;
let remotePlaylistSet = false;
let host = false;

export function addSong(song) {
  return {
    type: ADD_SONG,
    payload: song
  }
}

export function setSongs(songs, nowPlaying) {
  if ( nowPlaying && nowPlaying.id !== 0) {
    const filtered = [...songs]
    const found = filtered.find(song => song.id === nowPlaying.id) 
    if (found) {
      found.playing = true;
    }
    return {
      type: SET_SONGS,
      payload: filtered
    }
  } else {
    return {
      type: SET_SONGS,
      payload: songs
    }
  }
}

export function addSongs(tracks) {
  return {
    type: ADD_SONGS,
    payload: tracks
  };
}

export function remoteAddSongs(userID, remotePlaylistID, tracks, room_id) {
  const tracksString = tracks.map((track) => {
    return `spotify:track:${track.id}`
  });
  return (dispatch) => {
    spotifyApi.addTracksToPlaylist(userID, remotePlaylistID, tracksString)
      .then(() => {
        socket.emit('add-song', {
          room_id: room_id,
          songObj: tracks
        });
        socket.emit('request-song-list', room_id);
        if (tracks.length === 1) {
          dispatch(addSong(tracks[0]));
        } else {
          dispatch(addSongs(tracks));
        }
      }).catch(error => {
        console.log('error:', error)
      })
  }
}

export function remoteRemoveSongs(userID, remotePlaylistID, tracks, room_id) {
  const tracksString = tracks.map((track) => {
    return `spotify:track:${track.id}`
  }).join();
  return (dispatch) => {
    if (tracks[0].id === 0 || remotePlaylistID === 'NOT_CHECKED'){
     return;
    }
    spotifyApi.removeTracksFromPlaylist(userID, remotePlaylistID, [tracksString])
      .then(() => {
        socket.emit('add-song-to-archive', {
          song_id: tracks[0].id,
          room_id: room_id
        })
        socket.emit('remove-song', {
          room_id: room_id,
          song_id: tracks[0].id
        });
        socket.emit('request-song-list', room_id);
        dispatch(removeSong(tracks[0].id)); // assumes only one song is being removed
      })
  }
}

export function removeSong(id) {
  return {
    type: REMOVE_SONG,
    payload: id
  };
}

export function searchSongs(term) {
  const request = spotifyApi.searchTracks(term, { limit: 5 });
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
};

export function checkRemotePlaylist(remotePlaylist) {
  return {
    type: UPDATE_REMOTE,
    payload: remotePlaylist
  }
};



export function remoteCheckRemotePlaylists(userID) {
  return (dispatch) => {
    spotifyApi.getUserPlaylists(userID).then((results) => {
      // check for name 'Oxcord'
      const found = results.items.find(playlist => playlist.name === 'Oxcord');
      let result;
      if (found) {
        result = {
          id: found.id,
          exists: true
        }
        remotePlaylistSet = true;
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

export function importPlaylist(userID, playlistID) {
  host = true; //verify that user is host
  const request = spotifyApi.getPlaylistTracks(userID, playlistID, {limit: 20});
  return {
    type: IMPORT_PLAYLIST,
    payload: request
  }
};

export function remoteImportPlaylist(owner, userID, playlistID, songs, remotePlaylistID, room_id) {
  return (dispatch) => {
    // Get songs
    spotifyApi.getPlaylistTracks(owner, playlistID, {limit: 20})
      .then((response) => {
        const pulledTracks = response.items.map((result) => {
          return {
            id: result.track.id,
            name: result.track.name,
            artist: result.track.artists[0].name,
            votes: 0,
            cover_art: result.track.album.images[2].url,
            playing: false
          }
        });
        // filter duplicates
        const filteredTracks = pulledTracks.filter((song) => {
          return !songs.some(item =>item.id === song.id )
        })
        // add to remote
        dispatch(remoteAddSongs(userID, remotePlaylistID, filteredTracks, room_id))
      })
  }
}

export function createRemotePlaylist(newRemotePlaylist) {
  return {
    type: UPDATE_REMOTE,
    payload: newRemotePlaylist
  }
};

export function remoteCreateRemotePlaylist(userID) {
  return (dispatch) => {
    spotifyApi.createPlaylist(userID, { name: 'Oxcord', public: true, description: 'Playlist created by Oxcord' })
      .then((createdPlaylist) => {
        const result = {
          id: createdPlaylist.id,
          exists: true
        }
        remotePlaylistSet = true;
        dispatch(createRemotePlaylist(result));
      })
  }
};

// start remote playlist from beginning
export function remoteStartPlaylist(userID, remotePlaylistID, songs, nowPlaying) {
  const context_uri = `spotify:user:${userID}:playlist:${remotePlaylistID}`;
  return (dispatch) => {
    spotifyApi.setShuffle(false, {})
      .then( () => spotifyApi.play({ context_uri }) ) 
      .then(() => {
        dispatch(play())
        // something stupid pls don't laugh
        dispatch(remoteSkip())
      })  
  }
};


// start or resume playback
export function play() {
  return {
    type: PLAYER_STATUS,
    payload: 'PLAY'
  }
};

export function remotePlay() {
  return (dispatch) => {
    spotifyApi.play({})
      .then(() => {
        dispatch(play())
      })
  }
};

// start or resume playback
export function pause() {
  return {
    type: PLAYER_STATUS,
    payload: 'PAUSE'
  }
};

export function remotePause() {
  return (dispatch) => {
    spotifyApi.pause({})
      .then(() => {
        dispatch(pause())
      })
  }
};

export function skip() {
  return {
    type: PLAYER_STATUS,
    payload: 'PLAY'
  }
};

export function remoteSkip() {
  return (dispatch) => {
    spotifyApi.skipToNext({})
      .then(() => {
        dispatch(skip())
      });
  }
};

export function storeTokens(tokens) {
  spotifyApi.setAccessToken(tokens.access_token);
  tokenSet = true;
  return {
    type: STORE_TOKEN,
    payload: tokens
  }
};


export function remoteRefreshToken(tokens) {
  return (dispatch) => {

    /// Fetch Attempt
    const FETCH_URL = '/refresh_token?' + querystring.stringify({refresh_token: tokens.refresh_token });
    const myOptions = {
      method: 'GET'
    };
    fetch(FETCH_URL, myOptions)
      .then( (response) => {
        response.json().then((data) => {
          const newTokens = {
            access_token: data.access_token,
            refresh_token: tokens.refresh_token
          }
          dispatch(storeTokens(newTokens))
        })
      }).catch((error) => {
        console.log("error", error)
      })
      //
  }
}
export function remoteStoreUser(){
  return (dispatch) => {
    const user = spotifyApi.getMe()
      .then((response) => {
        dispatch(storeUser(response))
      })
  }
}

export function storeUser(user) {
  return {
    type: STORE_USER,
    payload: user
  }
};

export function startParty(){
  return {
    type: PARTY_STATUS,
    payload: { started: true }
  }
}

export function joinRoom(room_id) {
  socket.emit('join-room', room_id);
  return {
    type: JOIN_ROOM,
    payload: room_id
  }
};

export function getGeo(coords) {
  return {
    type: GET_GEO,
    payload: coords
  }
};

export function updateNowPlaying(nowPlaying) {
  return {
    type: UPDATE_NOW_PLAYING,
    payload: nowPlaying
  }
}

export function updateActiveDevice(device) {
  return {
    type: UPDATE_ACTIVE_DEVICE,
    payload: device
  }
}

export function updateDevices(devices) {
  return {
    type: UPDATE_DEVICES,
    payload: devices
  }  
}

export function remoteCheckDevices(){
  return (dispatch) => {
    spotifyApi.getMyDevices()
      .then((response) => {
        dispatch(updateDevices(response.devices))
      })
  }
}

export function remoteTransferPlayback(device){
  return (dispatch) => {
    spotifyApi.transferMyPlayback([device.id])
      .then((response) => {
        updateActiveDevice(device)
      })
  }
}

export function voteSong(room_id, song_id) {
  socket.emit('add-vote', { room_id: room_id, song_id: song_id })
  return {
    type: SET_VOTE,
    payload: {}
  }
}

export function unvoteSong(room_id, song_id) {
  socket.emit('minus-vote', { room_id: room_id, song_id: song_id })
  return {
    type: SET_VOTE,
    payload: {}
  }
}

////////////////////////////////////////////////////////////////////////////////////
// check now playing -- this will be refactored to a different function
////////////////////////////////////////////////////////////////////////////////////

class CheckNowPlaying extends EventEmitter {
  constructor() {
    super();
    this.statInterval();
    this.nowPlaying = {
      track: {
        id: 0,
        name: 'unknown(server)'
      },
      playlist: 'unknownPlaylist'
    }
    this.previous = {
      track: {
        id: 99,
        name: 'previous'
      },
      playlist: 'unknownPreviousPlaylist'
    }
  }
  statInterval() {
    setInterval(() => {
      if (tokenSet && host) {
        this.checkSong();
      }
    }, 2500);
  }
  
  checkSong() {
    this.remoteCheckCurrentPlayingTrack(this.nowPlaying, (nowPlaying, previous) => {
      this.emit('nowPlaying', nowPlaying, previous)
      this.nowPlaying = nowPlaying;
      this.previous = previous;
    });
  }
  remoteCheckCurrentPlayingTrack(previous, cb) {
    spotifyApi.getMyCurrentPlaybackState({})
      .then((result) => {
        if (!result.item){
          return;
        }
        const track = {
          id: result.item.id,
          name: result.item.name,
          artist: result.item.artists[0].name,
          cover_art: result.item.album.images[1].url,
          cover_background: result.item.album.images[0].url
        }
        const device = result.device;
        const playlist = !result.context ? null : result.context.uri.split('playlist:')[1];
        const nowPlaying = {
          track,
          playlist,
          device
        }
        cb(nowPlaying, previous)
      })
  }
}


const checkNowPlaying = new CheckNowPlaying();

export function setTrackToPlaying(song){
  return {
    type: SET_TO_PLAYING,
    payload: song
  }
}

export function remoteCheckNowPlaying(remotePlaylistID, userID, room_id, songs) {
  return (dispatch) => {
    checkNowPlaying.on('nowPlaying', (nowPlaying, previous) => {
      if (nowPlaying.track.id !== previous.track.id || nowPlaying.device.id !== previous.device.id ) {
        dispatch(updateActiveDevice(nowPlaying.device));
        dispatch(updateNowPlaying(nowPlaying.track));
        dispatch(setTrackToPlaying(nowPlaying.track));
        socket.emit('update-now-playing', { songObj: nowPlaying.track, room_id: room_id });
        dispatch(remoteRemoveSongs(userID, remotePlaylistID, [previous.track], room_id));
      }
    })
  }
}

function reorder(input, start, index) {
  const reordered = [...input];
  const offset = start < index ? -1 : 0;
  const removed = reordered.splice(start, 1)[0];
  reordered.splice(index + offset, 0, removed)
  return reordered;
}

function findReorderForSpotifyTopThree(livePlaylist, localPlaylist) {
  const liveTopThree = livePlaylist.slice(0, 3);
  const diff = liveTopThree.find((item, index)=>{
    return localPlaylist[index].id !== item.id
  })
  if (diff){
    const localDiffIndex = localPlaylist.findIndex((item) => {return item.id === diff.id});
    const liveDiffIndex = livePlaylist.findIndex((item) => {return item.id === diff.id});
    const reordered = reorder(localPlaylist, localDiffIndex, liveDiffIndex);
    const output = {
      exists: true,
      start: localDiffIndex,
      insert_before: liveDiffIndex
    }
    return output;

  } else {
    return;
  }
}


export function remoteCheckOrder(userID, remotePlaylistID, songs){
  return (dispatch) => {
    if (songs.length === 0 || songs[0].id === 0 || !host)
    {
     // dispatch({type: 'DO_NOTHING', payload: ''})
    } else {
      if (remotePlaylistID !== 'NOT_CHECKED') {
        spotifyApi.getPlaylistTracks(userID, remotePlaylistID, {limit: 20}).then((response) => {
          const pulledTracks = response.items.map((result) => {
            return {
              id: result.track.id,
              name: result.track.name
            }
          });
          const reorder = findReorderForSpotifyTopThree(songs, pulledTracks);
          if (reorder) {
            spotifyApi.reorderTracksInPlaylist(userID, remotePlaylistID, reorder.start, reorder.insert_before)
          }
            
        })
      }
    }
  }
}