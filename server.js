var path = require('path');
var express = require('express');
var app = express();
var PORT = process.env.PORT || 8888;
var REDIRECT = process.env.REDIRECT || 'http://localhost:8888';
var server = require('http').createServer(app);
var io = require('socket.io')(server);
require('dotenv').config();

//https
var httpsRedirect = require('express-https-redirect');

const http = require('http');
const MongoDB = require('mongodb').MongoClient;
const MONGODB_URI = process.env.MONGODB_URI;
const cookieParser = require('cookie-parser');
const spotifyRouteHelpers = require('./server-files/routes/spotify');

const distanceInKmBetweenEarthCoordinates = require('./src/lib/coordCalculator');

let SHOW_DEBUG = true;
let dataHelpers = require('./server-files/lib/data-helpers')


app.use(function (req, res, next) {
  res.setHeader(`Access-Control-Allow-Origin`, `*`);
  res.setHeader(`Access-Control-Allow-Credentials`, `true`);
  res.setHeader(`Access-Control-Allow-Methods`, `GET,HEAD,OPTIONS,POST,PUT,DELETE`);
  res.setHeader(`Access-Control-Allow-Headers`, `Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers`);
  res.setHeader(`Cache-Control`, `no-cache`);
  next();
});

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

app.use('/', httpsRedirect());

app.use(express.static(path.join(__dirname, 'dist')))
  .use(cookieParser())
  .use(spotifyRouteHelpers);

app.get('*', function (request, response) {
  response.sendFile(__dirname + '/dist/index.html')
});

/*
 *  MongoDB Connection 
 */
MongoDB.connect(MONGODB_URI, function (err, db) {
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

  socket.on('toggle-suggestions', (data) => {
    if (SHOW_DEBUG) { console.log(' + Suggestion state toggled', data) }
    io.to(data.room_id).emit('suggestion-state', data.suggestions)
  });

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

  socket.on('request-host-token', (room_id) => {
    if (SHOW_DEBUG) { console.log(' + User requested host token') }
    dataHelpers.getHostTokens(room_id, (err, tokens) => {
      io.to(room_id).emit('host-tokens-sent', tokens[0].tokens);
    });
  });

  socket.on('request-archived-songs', (room_id) => {
    if (SHOW_DEBUG) { console.log(' + Host requested archived songs list ', room_id); }
    dataHelpers.getArchivedSongsFromRoomID(room_id, (err, songs) => {
      socket.emit('archived-songs-sent', songs);
    });
  });

  socket.on('request-tokens-from-host', (room_id) => {
    if (SHOW_DEBUG) { console.log(' + Request for tokens from host has been issued ', room_id); }
    io.to(room_id).emit('request-tokens-from-host');
  });

  socket.on('distribute-new-tokens', (data) => {
    io.to(data.room_id).emit('host-tokens-sent', data.tokens);
  });

  socket.on('request-song-list', (room_id) => {
    if (SHOW_DEBUG) { console.log(' + Client requested' + room_id + '\'s song list!') }
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
    if (SHOW_DEBUG) { console.log(' + Client requested an active rooms list!') }
    dataHelpers.getActiveRooms((err, rooms) => {
      socket.emit('active-rooms-sent', rooms);
    });
  });

  socket.on('request-active-rooms-nearby', (coordsObj) => {
    if (SHOW_DEBUG) { console.log(' + Client requested an active rooms nearby list!', coordsObj) }
    dataHelpers.getActiveRooms((err, rooms) => {
      let nearbyRooms = rooms.filter((room) => {
        if (distanceInKmBetweenEarthCoordinates(room.geolocation.latitude, room.geolocation.longitude, coordsObj.latitude, coordsObj.longitude) <= 0.25) {
          return room;
        }
        // return room;
      })
      socket.emit('active-rooms-sent', nearbyRooms);
    });
  });

  socket.on('remove-party', (room_id) => {
    dataHelpers.removePartyObj(room_id);
    io.to(room_id).emit('host-ended-party');
  });

  socket.on('request-suggestion-status-from-host', (room_id) => {
    io.to(room_id).emit('request-suggestion-status-from-host');
  });

  socket.on('distribute-suggestion-status', (data) => {
    io.to(data.room_id).emit('suggestion-status-sent', data.status);
  });

  console.log('> Client Connected to Socket Server ', socket.id);
});

server.listen(PORT, () => console.log('Socket.IO Server running on ' + PORT));


// Experimental Spotify API Code 