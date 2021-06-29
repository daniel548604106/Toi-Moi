const express = require('express');
const app = express();
const server = require('http').Server(app);

const groupCallIo = require('socket.io')(server, {
  path: '/api/rooms'
});

// Group Call Socket
groupCallIo.on('connection', (socket) => {
  const groupCallUsers = {};
  if (!groupCallUsers[socket.id]) {
    groupCallUsers[socket.id] = socket.id;
  }
  console.log('connected!!');
  socket.on('joinedRoom', ({ name }) => {
    console.log('hihihi', name);
  });
});

module.exports = groupCallIo;
