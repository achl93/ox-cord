//client.js
var io = require('socket.io-client');
var socket = io.connect('http://localhost:8888', {reconnect: true});

// Add a connect listener
socket.on('connect', function (data) {
    console.log('CLIENT - Socket.IO Connected!');
    // Send add-user to server
    socket.emit('add-user', 'Anonymous');
    socket.emit('join-room', socket.id);
    socket.emit('set-tokens', {
        auth_key: '123456',
        other_key: '654321'
    });
    socket.emit('set-geolocation', {
        long: 40,
        lat: 120
    });
});


// When server sends back user-joined
socket.on('user-joined', function(data) {
    console.log(' + user-joined : ', data);
});

socket.on('room-joined', function(data) {
    console.log(' + room-joined : ', data);
});

socket.on('tokens-set', function(data) {
    console.log(' + tokens-set : ', data);
});

socket.on('disconnect', function(data) {
    console.log('CLIENT DISCONNECTED');
})