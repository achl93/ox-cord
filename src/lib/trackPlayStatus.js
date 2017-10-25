import EventEmitter from 'events';
const SpotifyWebApi = require('spotify-web-api-js');
const spotifyApi = new SpotifyWebApi();

// don't forget auth token scope when implementing
spotifyApi.setAccessToken('BQCgDXXWA9WOgY-NY5rkAMuPOJtaJjM_T3yby-7DXMoyFCkAh4Vk21T2zqQWlNTIInEwOvACs85LVx9cbuDaY4E5nx-R2UYkPuHXm2mlXI0Lr4SeTDYm4wlrpBdLR7qC89tkSidk8pKzab7HAC2tsFY3bkKLcdoAR6jBLx0');
// https://developer.spotify.com/web-api/console/get-users-currently-playing-track/

function remoteCheckCurrentPlayingTrack(cb){
  spotifyApi.getMyCurrentPlayingTrack({})
  .then((result) => {
    const nowPlaying = {
      id: result.item.id,
      name: result.item.name
    }
    cb(nowPlaying)
  })
}

class trackPlayStatus extends EventEmitter {
  constructor() {
    super();
    this.statInterval();
  }
    statInterval(){
    const interval = setInterval(()=>{
      this.checkSong()
    }, 1000);
  }
  checkSong(){
    remoteCheckCurrentPlayingTrack((trackID) => {
      this.emit('songCheck', trackID)
    });
  }
}

const checker = new trackPlayStatus();


function currentSongChecker(cb){
  checker.on('songCheck', cb);
}




export default currentSongChecker;