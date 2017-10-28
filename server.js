var path = require('path');
var express = require('express');
var app = express();
var PORT = process.env.PORT || 8888;
var server = require('http').createServer(app);
var io = require('socket.io')(server);

const http = require('http');
const MongoDB = require('mongodb').MongoClient;
const MongoURL = 'mongodb://localhost:27017/oxcord'; //ENV
const cookieParser = require('cookie-parser');
const spotifyRouteHelpers = require('./server-files/routes/spotify');



const distanceInKmBetweenEarthCoordinates = require('./src/lib/coordCalculator');

let SHOW_DEBUG = true;
let dataHelpers = require('./server-files/lib/data-helpers')

// using webpack-dev-server and middleware in development environment
if (process.env.NODE_ENV !== 'production') {
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var webpack = require('webpack');
  var config = require('./webpack.config');
  var compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.join(__dirname, 'dist')))
  .use(cookieParser())
  .use(spotifyRouteHelpers);

app.get('*', function(request, response) {
  response.sendFile(__dirname + '/dist/index.html')
});

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

  socket.on('minus-vote', (data) => {
    if (SHOW_DEBUG) { console.log(' + Client unvoted on a song!', data) }
    dataHelpers.decrementSongVote(data.room_id, data.song_id, (err, res) => {
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
      if (res[0] !== undefined) {
        dataHelpers.addSongToArchive(res[0].playlist[0], data.room_id, (err, res) => {
        });
      }
    });
  });

  socket.on('request-song-list', (room_id) => {
    if (SHOW_DEBUG) { console.log(' + Client requested a song list!') }
    dataHelpers.getSongsFromRoomID(room_id, (err, songs) => {
      io.to(room_id).emit('song-list-sent', songs);
    });
  });

  socket.on('request-now-playing', (room_id) => {
    io.to(room_id).emit('request-now-playing', room_id);
  })

  socket.on('update-now-playing', (data) => {
    io.to(data.room_id).emit('now-playing-updated', data.songObj);
  });

  socket.on('request-active-rooms', () => {
    if (SHOW_DEBUG) { console.log(' + Client requested an active room list!') }
    dataHelpers.getActiveRooms((err, rooms) => {
      io.sockets.emit('active-rooms-sent', rooms);
    });
  });

  socket.on('request-active-rooms-nearby', (coordsObj) => {
    if (SHOW_DEBUG) { console.log(' + Client requested an active rooms nearby list!', coordsObj) }
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