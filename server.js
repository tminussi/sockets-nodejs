var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');

app.use(express.static(__dirname + '/public'));

var clientInfo = {};

io.on('connection', function (socket) {
    console.log('User connected via socket.io');

    socket.on('message', function (message) {
        console.log(message);
        var timeSent = moment().locale('pt-br').format('LL, LTS');
        io.to(clientInfo[socket.id].room).emit('message', message, timeSent);
    });

    socket.on('joinRoom', function (req) {
        clientInfo[socket.id] = req;
        var room = req.room;
        socket.join(room);
        socket.broadcast.to(room).emit('message', {
            name: 'System',
            text: req.name + ' has joined the room',
            timestamp: moment().valueOf()
        });

    });

    socket.emit('message', {
        name: 'System',
        text: 'Welcome to the Chat App!'
    });

});


http.listen(PORT, function () {
    console.log('Server started')
});