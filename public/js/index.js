var socket = io();

/* the .io are listenner*/

socket.on('connect', function() {
  console.log('connected to server');
});

socket.on('disconnect', function(userDisconnected) {
  console.log(userDisconnected);
});

socket.on('newMessage', function(newMessage) {
  var formattedTime = moment(newMessage.createdAt).format('h:mm a')
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: newMessage.text,
    from: newMessage.from,
    createdAt: formattedTime
  });
  jQuery('#messages-list').append(html);

  // var li = jQuery('<li></li>');
  // li.text(`${newMessage.from} ${formattedTime} : ${newMessage.text}`);

  // jQuery('#messages-list').append(li);
});

socket.on('newLocationMessage', (message) => {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });

  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My current location</a>');
  // li.text(`${message.from} ${formattedTime} : `);
  // a.attr('href', message.url);

  // li.append(a);  
  jQuery('#messages-list').append(html);
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();   // prevent default behaviour(like refreshing the page when clicking send button in htis example)

    var messageTextbox = jQuery('[name=message]')

  socket.emit('createMessage', {
    from: "User",
    text: messageTextbox.val()
  }, function() {   // Callback who reset placeholder once the message is send
    messageTextbox.val('')
  })
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
  if(!navigator.geolocation) {
    locationButton.removeAttr('disabled')
    return alert('Geolocation not supported by your browser')
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...'); // disable the button on click

  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttr('disabled').text('Send location') // get the button able after the process
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function() {
    alert('Enable to fetch location.')
  })
})
