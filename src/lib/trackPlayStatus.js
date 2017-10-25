import EventEmitter from 'events';
const SpotifyWebApi = require('spotify-web-api-js');
const spotifyApi = new SpotifyWebApi();

// don't forget auth token scope when implementing
spotifyApi.setAccessToken('BQDmMjPIpbRL7XVGOv46MksqpTBIpVwjve4KXVQDzq61obRvQnyZX_F1KKzFSbimSb00bxDh58Tq8H5Klw-9Y1soppQycGLxivb_Jx_Lk404l12r3PwY8IB_LcRoLBSHB6PAzXC4r0kVsFs3lXgUwV5xLfwC-3S_GMReLcw');
// https://developer.spotify.com/web-api/console/get-users-currently-playing-track/

function remoteCheckCurrentPlayingTrack(cb){
  spotifyApi.getMyCurrentPlayingTrack({})
  .then((result) => {
    const track = {
      id: result.item.id,
      name: result.item.name
    }
    const playlist = result.context.uri.split('playlist:')[1];
    console.log('now playing playlist:', playlist)
    const nowPlaying = {
      track,
      playlist
    }
    cb(nowPlaying)
  })
}

class trackPlayStatus extends EventEmitter {
  constructor() {
    super();
    this.statInterval();
    this.nowPlaying = {
      track: {
        id: 0,
        name: 'unknown'
      },
      playlist: '0v5AO6ONWuqz3t7Vo83u6d'
    }
  }
    statInterval(){
    const interval = setInterval(()=>{
      this.checkSong()
    }, 1000);

    // const clear = setTimeout(()=>{
    //   clearTimeout(interval)
    // }, 3000)
  }
  checkSong(){
    remoteCheckCurrentPlayingTrack((nowPlaying) => {
      if (nowPlaying.track.id !== this.nowPlaying.track.id){
        this.emit('songChange', nowPlaying)
        this.nowPlaying = nowPlaying;
      }
    });
  }
}

const nowPlaying = new trackPlayStatus();




export default nowPlaying;