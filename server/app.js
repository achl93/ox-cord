const express   = require('express');
const http      = require('http');
const socketIo  = require('socket.io');
const MongoDB   = require('mongodb').MongoClient
const MongoURL  = 'mongodb://localhost:27017/oxcord';

const app       = express();
const server    = http.Server(app);
const io        = socketIo(server);

MongoDB.connect(MongoURL, function(err, db) {
  console.log("Connected successfully to MongoDB server");
  db.close();
});

io.on('connection', (socket) => {
  const { id, name } = socket.decoded_token;

  socket.on('add-user', (username) => {

  });

  socket.on('join-room', (room) => {
    //store.dispatch({ type: 'JOIN_ROOM', room_id: room });
    socket.join(room);
    socket.broadcast.emit('user-joined', {

    });
  });

  console.log('Connected', id, name);
});

server.listen(2017);