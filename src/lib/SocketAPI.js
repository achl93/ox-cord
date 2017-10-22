const socket = require('socket.io-client')('http://localhost:8888');

socket.on('connect', () => {
  console.log('connected to socket server')
})

socket.on('room-created', (data) => {
  console.log('ROOM CREATED!')
  console.log(data)
});

module.exports = socket;