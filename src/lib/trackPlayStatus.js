// import EventEmitter from 'events';
// // const SpotifyWebApi = require('spotify-web-api-js');
// // const spotifyApi = new SpotifyWebApi();

// // // don't forget auth token scope when implementing
// // spotifyApi.setAccessToken('BQBTCQbRQS45luXQWR5hrahIeym6qnUckJlI7C3mlIMbgZQJhAM80_nZjGszLwkLLSCDjuduWTM_N5SHmrrJ6v-zsZgyrS6bj5rzabRQWN58PQ13z-hAz1S9sUgMJdtXzpIi7uZ_Uhh15VT_i7Y8hFZT9deAzAX2GkffteM');
// // // https://developer.spotify.com/web-api/console/get-users-currently-playing-track/

// function remoteCheckCurrentPlayingTrack(previous, cb){
//   spotifyApi.getMyCurrentPlayingTrack({})
//   .then((result) => {
//     const track = {
//       id: result.item.id,
//       name: result.item.name
//     }
//     const playlist = result.context.uri.split('playlist:')[1];
//     const nowPlaying = {
//       track,
//       playlist
//     }
//     cb(nowPlaying, previous)
//   })
// }

// class trackPlayStatus extends EventEmitter {
//   constructor() {
//     super();
//     this.statInterval();
//     this.nowPlaying = {
//       track: {
//         id: 0,
//         name: 'unknown(server)'
//       },
//       playlist: '0v5AO6ONWuqz3t7Vo83u6d'
//     }
//     this.previousTrack = {
//       id: 99,
//       name: 'previous'
//     }
//   }
//     statInterval(){
//     const interval = setInterval(()=>{
//       this.checkSong()
//     }, 1000);

//     // const clear = setTimeout(()=>{
//     //   clearTimeout(interval)
//     // }, 3000)
//   }
//   checkSong(){
//     remoteCheckCurrentPlayingTrack(this.nowPlaying.track, (nowPlaying, previous) => {
//         this.emit('songChange', nowPlaying, previous)
//         this.nowPlaying = nowPlaying;
//         this.previousTrack = previous;
//     });
//   }
// }

// // const nowPlaying = new trackPlayStatus();




// // export default trackPlayStatus;