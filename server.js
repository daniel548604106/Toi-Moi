const { createServer } = require('http');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const dev = process.env.NODE_ENV !== 'production';
const io = require('socket.io')(server);

//The custom server uses the following import to connect the server with the Next.js application:

const next = require('next');
const nextApp = next({ dev });

const handle = nextApp.getRequestHandler();
const connectDB = require('./utils/connectDB');
const PORT = process.env.PORT || 3000;

// Because of our setting , the server and client will both run on port 3000
// The following dotenv config will have access to .env file , so make sure it's named as .env and not .env.local .etc
require('dotenv').config();
connectDB();

app.use(express.json()); // this is the body parser

// Socket.io
// socket means the client user who is connected
io.on('connection', (socket) => {
  socket.on('sendMessage', (data) => {
    console.log('received', data);
    socket.emit('dataReceived', { name: 'Hello Dnaiel' });
  });
});

nextApp.prepare().then(() => {
  //routes
  app.use('/api/login', require('./routes/login'));
  app.use('/api/signup', require('./routes/signup'));
  app.use('/api/search', require('./routes/search'));
  app.use('/api/chats', require('./routes/chats'));
  app.all('*', (req, res) => handle(req, res));

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`express server running on ${PORT}`);
  });
});
