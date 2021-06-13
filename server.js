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

const { addUser, removeUser } = require('./utilsServer/roomActions');
const { loadMessages } = require('./utilsServer/messageActions');
// socket means the client user who is connected
io.on('connection', (socket) => {
  socket.on('join', async ({ userId }) => {
    // socket.id is auto generated by socket, regenerated at every connection.
    //  This is also the name of the room that the Socket automatically joins on connection
    console.log('userId', userId);
    const users = await addUser(userId, socket.id);
    console.log(users);

    // Sending back all the users other than the logged in user who has made the connection
    setInterval(() => {
      socket.emit('connectedUsers', {
        users: users.filter((user) => user.userId !== userId)
      });
    }, 10000);
  });

  socket.on('loadMessages', async ({ userId, messagesWith }) => {
    const { chat, error } = await loadMessages(userId, messagesWith);
    if (!error) {
      socket.emit('messagesLoaded', { chat });
    } else {
      console.log(error);
    }
  });

  socket.on('disconnected', () => {
    removeUser(socket.id);
    console.log('user disconnected');
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
