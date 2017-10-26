const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const MongoDB = require('mongodb').MongoClient;
const MongoURL = 'mongodb://localhost:27017/oxcord';
const cookieParser = require('cookie-parser');
const spotifyRouteHelpers = require('./routes/spotify');

const app = express();
const server = http.Server(app);
const io = socketIo(server);

const distanceInKmBetweenEarthCoordinates = require('../src/lib/coordCalculator');

let SHOW_DEBUG = true;
let PORT = process.env.PORT | 8888;
let dataHelpers = require('./lib/data-helpers');

app.use(express.static(__dirname + '/public'))
    .use(cookieParser())
    .use(spotifyRouteHelpers);

/*
 *  MongoDB Connection 
 */
MongoDB.connect(MongoURL, function (err, db) {
  if (err) {
    console.log(`Failed to connect to mongodb`);
    throw err;
  }
  dataHelpers = dataHelpers(db);
  console.log("Connected successfully to MongoDB server");
});

/*
 *  Socket.IO Connection 
 */
io.on('connection', (socket) => {

  socket.on('join-room', (room) => {
    if (SHOW_DEBUG) { console.log(' + Client has joined the room : ', room) }
    socket.join(room);
    io.sockets.emit('user-joined', room);
  });

  socket.on('create-room', (data) => {
    if (SHOW_DEBUG) { console.log(' + Client created a new room : ', data) }
    dataHelpers.createRoom(data, (err, result) => {
      io.sockets.emit('room-created', data);
    });
  });

  socket.on('add-vote', (data) => {
    if (SHOW_DEBUG) { console.log(' + Client voted on a song!', data) }
    dataHelpers.incrementSongVote(data.room_id, data.song_id, (err, res) => {
      dataHelpers.getSongsFromRoomID(data.room_id, (err, songs) => {
        io.to(data.room_id).emit('song-list-sent', songs);
      });
    });
  });

  socket.on('add-song', (data) => {
    if (SHOW_DEBUG) { console.log(' + Host added a song!', data) }
    dataHelpers.addSongToPlaylist(data.songObj[0], data.room_id, (err, res) => {
      dataHelpers.getSongsFromRoomID(data.room_id, (err, songs) => {
        io.to(data.room_id).emit('song-list-sent', songs);
      });
    });
  });

  socket.on('remove-song', (data) => {
    if (SHOW_DEBUG) { console.log(' + Host removed a song!', data) }
    dataHelpers.removeSongFromPlaylist(data.song_id, data.room_id, (err, res) => {
      dataHelpers.getSongsFromRoomID(data.room_id, (err, songs) => {
        io.to(data.room_id).emit('song-list-sent', songs);
      });
    });
  });

  socket.on('add-song-to-archive', (data) => {
    dataHelpers.getSongFromRoomID(data.song_id, data.room_id, (err, res) => {
      console.log('ADD TO ARCHIVE', res);
    });
  });

  socket.on('request-song-list', (room_id) => {
    if (SHOW_DEBUG) { console.log(' + Client requested a song list!') }
    dataHelpers.getSongsFromRoomID(room_id, (err, songs) => {
      io.to(room_id).emit('song-list-sent', songs);
    });
  });

  socket.on('request-active-rooms', (coordsObj) => {
    if (SHOW_DEBUG) { console.log(' + Client requested an active room list!', coordsObj) }
    dataHelpers.getActiveRooms((err, rooms) => {
      let nearbyRooms = rooms.filter((room) => {
        if (distanceInKmBetweenEarthCoordinates(room.geolocation.latitude, room.geolocation.longitude, coordsObj.latitude, coordsObj.longitude) <= 0.5) {
          return room;
        }
      })
      io.sockets.emit('active-rooms-sent', nearbyRooms);
    });
  });

  console.log('> Client Connected to Socket Server ', socket.id);
});

server.listen(PORT, () => console.log('Socket.IO Server running on ' + PORT));


// Experimental Spotify API Code 