const socket = require('socket.io-client')('http://localhost:8888');

// socket.on('connect', () => {
//   console.log('> Connected to Socket Server')
// });

// socket.on('room-created', (data) => {
//   console.log('> Room Created! ', data);
// });

// socket.on('user-joined', (data) => {
//   console.log('> Joined Room! ', data);
// });

// socket.on('vote-added', (data) => {
//   console.log('> Vote Added to Song! ', data);
// });

// socket.on('song-list-sent', (songs) => {
//   console.log('> Song List has been sent! ', songs);
// });

// socket.on('active-rooms-sent', (rooms) => {
//   console.log('> Active Rooms List has been sent! ', rooms);
// });

module.exports = socket;