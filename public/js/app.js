var socket = io();
var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');

$('.room-title').text(room).append(' room');
socket.on('connect', function () {
    console.log('Connected to socket.io server');
    socket.emit('joinRoom', {
        name: name,
        room: room
    });
});

socket.on('message', function (message, timeSent) {
    $('.messages').append('<p>' + message.name + ' - ' + '<strong>' + timeSent + '</strong>' + ': ' + message.text + '</p>')
});

var $form = $('#message-form');
$form.on('submit', function (event) {
    event.preventDefault();
    var message = $form.find('input[name=message]');
    socket.emit('message', {
        name: name,
        text: message.val()
    });

    message.val('').focus();
});

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var args = query.split('&');
    for (var i = 0; i < args.length; i++) {
        var pair = args[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1].replace(/\+/g, ' '));
        }
    }
    return undefined;
}