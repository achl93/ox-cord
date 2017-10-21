const express       = require('express');
const http          = require('http');
const socketIo      = require('socket.io');
const MongoDB       = require('mongodb').MongoClient;
const MongoURL      = 'mongodb://localhost:27017/oxcord';

const app           = express();
const server        = http.Server(app);
const io            = socketIo(server);

let numUsers = 0;
let SHOW_DEBUG = true;

MongoDB.connect(MongoURL, function(err, db) {
  if (err) {
    console.log(`Failed to connect to mongodb`);
    throw err;
  }
  const dataHelpers   = require('./lib/data-helpers')(db);
  console.log("Connected successfully to MongoDB server");

  // dataHelpers.getRoomData('q6tubv3icueaamst4xw6h7go2', (err, data) => {
  //   console.log(data);
  // });

  // dataHelpers.getRooms((err, data) => {
  //   console.log(data);
  // });

  dataHelpers.getSongsFromRoomID('q6tubv3icueaamst4xw6h7go2', (err, data) => {
    console.log(data);
  });
});

io.on('connection', (socket) => {

  socket.on('add-user', (username) => {
    if (SHOW_DEBUG) { console.log(' + add-user : ', username) }
    socket.username = username;
    ++numUsers;
    socket.broadcast.emit('user-joined', {
      username: username,
      numUsers: numUsers
    });
  });

  socket.on('join-room', (room) => {
    if (SHOW_DEBUG) { console.log(' + join-room : ', room) }    
    socket.join(room);
    socket.broadcast.emit('user-joined', {
      room_id: room
    });
  });

  socket.on('set-tokens', (tokens) => {
    if (SHOW_DEBUG) { console.log(' + set-tokens : ', tokens) }
    // socket.broadcast sends to all EXCEPT client that sent
    socket.broadcast.emit('tokens-set', {
      something: true
    });
    // io.sockets.emit sends to ALL clients, including client that sent
    io.sockets.emit('tokens-set', {
      something_else: true
    });
  })

  socket.on('set-geolocation', (geolocation) => {
    if (SHOW_DEBUG) { console.log(' + set-geolocation : ', geolocation) }    
  });

  console.log('Connected successfully to Socket.IO');
});

server.listen(2017);