var socket = io();

socket.on('connect', function (socket) {
    console.log('Connected to socket.io server');
});

socket.on('message', function (message, timeSent) {
    $('.messages').append('<p>' + '<strong>' + timeSent + '</strong>' + ': ' + message.text + '</p>')
});

var $form = jQuery('#message-form');
$form.on('submit', function (event) {
    event.preventDefault();
    var message = $form.find('input[name=message]');
    socket.emit('message', {
        text: message.val()
    });

    message.val('').focus();
});