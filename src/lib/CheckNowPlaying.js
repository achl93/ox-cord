// import EventEmitter from 'events';

// class CheckNowPlaying extends EventEmitter {
//   constructor() {
//     super();
//     this.statInterval();
//     this.nowPlaying = {
//       track: {
//         id: 0,
//         name: 'unknown(server)'
//       },
//       playlist: 'unknownPlaylist'
//     }
//     this.previousTrack = {
//       id: 99,
//       name: 'previous'
//     }
//   }
//     statInterval(){
//     const interval = setInterval(()=>{
//       const token = spotifyApi.getAccessToken()
//       if (token){
//         this.checkSong();
//       }
//     }, 1000);

//     // const clear = setTimeout(()=>{
//     //   clearTimeout(interval)
//     // }, 3000)
//   }
//   checkSong(){
//     this.remoteCheckCurrentPlayingTrack(this.nowPlaying.track, (nowPlaying, previous) => {
//         this.emit('songChange', nowPlaying, previous)
//         this.nowPlaying = nowPlaying;
//         this.previousTrack = previous;
//     });
//   }
//   remoteCheckCurrentPlayingTrack(previous, cb){
//     spotifyApi.getMyCurrentPlayingTrack({})
//     .then((result) => {
//       const track = {
//         id: result.item.id,
//         name: result.item.name
//       }
//       const playlist = result.context.uri.split('playlist:')[1];
//       const nowPlaying = {
//         track,
//         playlist
//       }
//       cb(nowPlaying, previous)
//     })
//   }
// }

// export default CheckNowPlaying;