const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const axios = require('axios');

const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('Connected to server');

  socket.emit('newMessage', generateMessage('Χρήστης', 'Καλως ήρθες στη συνομιλία μας!'));

  socket.broadcast.emit('newMessage', generateMessage('Χρήστης', 'New User joined!'));

  socket.on('createMessage', (message, callback) => {
    console.log('new message from client', message);
    io.emit('newMessage',  generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Χρήστης', coords.latitude, coords.longitude))
  });

  socket.on('createWeatherMessage', () => {
    var weatherURL = 'https://api.darksky.net/forecast/011467c028347864ea183a0031ac9a66/37.9847,23.855065?lang=el&units=auto';
    axios.get(weatherURL)
    .then((response) => {
      var weatherMessage = `Αυτή τη στιγμή ο καιρός είναι ${response.data.currently.summary}, η θερμοκρασία ${response.data.currently.temperature}°C και η υγρασία ${response.data.currently.humidity * 100}%.`;
      socket.emit('newMessage', generateMessage('Admin', weatherMessage));
    })
    .catch((e) => {
      if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to mapquestapi');
      }
      else {
        console.log(e.message);
      }
    });
  });

  socket.on('disconnect', () => {
    console.log('User disonnected');
  })
});

server.listen(port, () => {
  console.log(`Started is up on port ${port}`);
});
