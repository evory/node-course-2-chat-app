var socket = io();

/* the .io are listenner*/

socket.on('connect', function() {
  console.log('connected to server');

  socket.emit('createMessage', {
    to: "Florent",
    text: "Hello how are you ?",
    createAt: 2103
  })
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(newMessage) {
  console.log(newMessage);
})
