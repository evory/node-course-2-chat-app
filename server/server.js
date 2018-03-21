const path = require('path');
const http = require ('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

/* io.on is a listenner on connection */

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: "Bryan",
    message: "coucou"
  })


/* socket.on is a listener */

socket.on('createMessage', (message) => {
  console.log('createMessage', message);
})

  socket.on('disconnect', () => {
    console.log('User was disctonnect');

  })
})


server.listen(port, () => {
  console.log('Server is up on port 3000');
});
