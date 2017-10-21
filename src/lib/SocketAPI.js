import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8888');

function socketAPI(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('message', 1000);
}

export { socketAPI };