const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('Connected to server');

  socket.emit('newMessage', {
    from: 'Server (node)',
    text: 'Hey client!',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (message) => {
    message.createdAt = new Date().getTime();
    console.log('new message from client', message);
  });

  socket.on('disconnect', () => {
    console.log('User disonnected');
  })
});

server.listen(port, () => {
  console.log(`Started is up on port ${port}`);
});
