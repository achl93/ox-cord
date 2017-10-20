const express   = require('express');
const http      = require('http');
const socketIo  = require('socket.io');
const MongoDB   = require('mongodb').MongoClient
const MongoURL  = 'mongodb://localhost:27017/oxcord';

const app       = express();
const server    = http.Server(app);
const io        = socketIo(server);

const { createStore }     = require('redux');
const { socketReducer }   = require('./reducers/socketReducer');
const store               = createStore(socketReducer);

store.subscribe(() => {
  console.log('Redux DataStore Changed', store.getState());
});

MongoDB.connect(MongoURL, function(err, db) {
  console.log("Connected successfully to MongoDB server");
  db.close();
});

io.on('connection', (socket) => {
  const { id, name } = socket.decoded_token;

  const subscription = store.subscribe(() => {
    socket.emit('update', store.getState());
  });

  socket.on('add', ({ targetId }) => {
    store.dispatch({ type: ACTION_METHOD, someVars: someVars });
  });

  socket.on('disconnect', () => {
    store.dispatch({ type: ACTION_METHOD, someVars: someVars });
    subscription();
  });

  console.log('Connected', id, name);
});

server.listen(2017);