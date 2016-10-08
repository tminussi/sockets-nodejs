var socket = io();
var name = getQueryVariable('name');
var room = getQueryVariable('room');
socket.on('connect', function (socket) {
    console.log('Connected to socket.io server');
});

socket.on('message', function (message, timeSent) {
    $('.messages').append('<p>' + name + ' - ' + '<strong>' + timeSent + '</strong>' + ': ' + message.text + '</p>')
});

var $form = $('#message-form');
$form.on('submit', function (event) {
    event.preventDefault();
    var message = $form.find('input[name=message]');
    socket.emit('message', {
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
            return decodeURIComponent(pair[1]);
        }
    }
    return undefined;
}