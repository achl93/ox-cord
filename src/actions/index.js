import socket from '../lib/SocketAPI';
import SpotifyWebApi from 'spotify-web-api-js';
import EventEmitter from 'events';
// import CheckNowPlaying from '../lib/CheckNowPlaying';

const spotifyApi = new SpotifyWebApi();

export const ADD_SONG = 'ADD_SONG';
// export const ADD_SONGS = 'ADD_SONGS';
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
export const SET_VOTE = 'SET_VOTE';

export function addSong(song) {
  return {
    type: ADD_SONG,
    payload: song
  }
}

export function setSongs(songs) {
  return {
    type: SET_SONGS,
    payload: songs
  }
}

// export function addSongs(tracks) {
//   return {
//     type: ADD_SONGS,
//     payload: tracks
//   };
// }

export function remoteAddSongs(userID, remotePlaylistID, tracks, room_id) {
  const tracksString = tracks.map((track) => {
    return `spotify:track:${track.id}`
  }).join();

  return (dispatch) => {
    spotifyApi.addTracksToPlaylist(userID, remotePlaylistID, [tracksString])
      .then(() => {
        console.log('song added successfully');
        socket.emit('add-song', {
          room_id: room_id,
          songObj: tracks
        });
        socket.emit('request-song-list', room_id);
        dispatch(addSong(tracks[0]));
      })
  }
}

export function remoteRemoveSongs(userID, remotePlaylistID, tracks /*, room_id*/) {
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
        console.log('song removed successfully');
        // socket.emit('remove-song', {
        //   room_id: room_id,
        //   song_id: tracks[0].id
        // });
        //socket.emit('request-song-list', room_id);
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
};

export function checkRemotePlaylist(remotePlaylist) {
  return {
    type: UPDATE_REMOTE,
    payload: remotePlaylist
  }
};

export function importPlaylist(userID, playlistID) {
  const request = spotifyApi.getPlaylistTracks(userID, playlistID, {limit: 20});
  return {
    type: IMPORT_PLAYLIST,
    payload: request
  }
};

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
};

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
};

// start remote playlist from beginning
export function remoteStartPlaylist(userID, remotePlaylistID) {
  console.log('sending start playlist request')
  const context_uri = `spotify:user:${userID}:playlist:${remotePlaylistID}`;
  return (dispatch) => {
    spotifyApi.play({context_uri})
    .then(() => {
      dispatch(play())
    })
  }
};


// start or resume playback
export function play() {
  console.log('play successful')
  return {
    type: PLAYER_STATUS,
    payload: 'PLAY'
  }
};

export function remotePlay() {
  console.log('sending play request')
  return (dispatch) => {
    spotifyApi.play({})
    .then(() => {
      dispatch(play())
    })
  }
};

// start or resume playback
export function pause() {
  console.log('pause successful')
  return {
    type: PLAYER_STATUS,
    payload: 'PAUSE'
  }
};

export function remotePause() {
  console.log('sending play request')
  return (dispatch) => {
    spotifyApi.pause({})
    .then(() => {
      dispatch(pause())
    })
  }
};

export function skip() {
  console.log('skip successful')
  return {
    type: PLAYER_STATUS,
    payload: 'PLAY'
  }
};

export function remoteSkip() {
  console.log('sending skip request')
  return (dispatch) => {
    spotifyApi.skipToNext({})
      .then(() => {
        dispatch(skip()) 
      });
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
  const user = spotifyApi.getMe();
  return {
    type: STORE_USER,
    payload: user
  }
};

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



export function voteSong(room_id, song_id) {
  console.log(song_id, room_id);
  socket.emit('add-vote', { room_id: room_id, song_id: song_id })
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
    this.previousTrack = {
      id: 99,
      name: 'previous'
    }
  }
    statInterval(){
    const interval = setInterval(()=>{
      const token = spotifyApi.getAccessToken()
      if (token){
        this.checkSong();
      }
    }, 1000);

    // const clear = setTimeout(()=>{
    //   clearTimeout(interval)
    // }, 3000)
  }
  checkSong(){
    this.remoteCheckCurrentPlayingTrack(this.nowPlaying.track, (nowPlaying, previous) => {
        this.emit('songChange', nowPlaying, previous)
        this.nowPlaying = nowPlaying;
        this.previousTrack = previous;
    });
  }
  remoteCheckCurrentPlayingTrack(previous, cb){
    spotifyApi.getMyCurrentPlayingTrack({})
    .then((result) => {

      const track = {
        id: result.item.id,
        name: result.item.name
      }
      const playlist = result.context.uri.split('playlist:')[1];
      const nowPlaying = {
        track,
        playlist
      }
      cb(nowPlaying, previous)
    })
  }
}


const checkNowPlaying = new CheckNowPlaying();


export function remoteCheckNowPlaying(remotePlaylistID, userID){
  return (dispatch) => {
    checkNowPlaying.on('songChange', (nowPlaying, previous) => {
      if ((nowPlaying.track.id !== previous.id) && (remotePlaylistID === nowPlaying.playlist)){
        console.log('dispatching song change!')
        dispatch(updateNowPlaying(nowPlaying.track));
        //removeTracksFromPlaylist(userID, remotePlaylistID, [tracksString])
        //remoteRemoveSongs(userID, remotePlaylistID, tracks /*, room_id*/)
        dispatch(remoteRemoveSongs(userID, remotePlaylistID, [previous]))
      }
    })
  }
}
