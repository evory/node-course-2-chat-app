var socket = io();

/* the .io are listenner*/

socket.on('connect', function() {
  console.log('connected to server');
});

socket.on('disconnect', function(userDisconnected) {
  console.log(userDisconnected);
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

var locationButton =jQuery('#send-location');
locationButton.on('click', function() {
  if(navigator.geolocation) {
    return alert('Geolocation not supported by your browser')
  }

  navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position);
  }, function() {
    alert('Enable to fetch location.')
  })
})
