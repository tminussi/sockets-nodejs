var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
    console.log('User connected via socket.io');

    socket.on('message', function (message) {
        var timeSent = moment().locale('pt-br').format('LL, LTS');
        io.emit('message', message, timeSent);
    });

    socket.emit('message', {
        text: 'Welcome to the Chat App!'
    });
});


http.listen(PORT, function () {
    console.log('Server started')
});