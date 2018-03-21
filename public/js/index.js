var socket = io();

/* the .io are listenner*/

socket.on('connect', function() {
  console.log('connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(newMessage) {
  console.log('newMessage', newMessage);
  var li = jQuery('<li></li>');
  li.text(`${newMessage.from}: ${newMessage.text}`);

  jQuery('#messages-list').append(li);
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();   // prevent default behaviour(like refreshing the page when clicking send button in htis example)
  socket.emit('createMessage', {
    from: "User",
    text: jQuery('[name=message]').val()
  }, function(cb) {   //aknowledger
    console.log(cb);
  })
});
