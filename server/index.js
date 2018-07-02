const app = require('express')();
const http = require('http');
const socketio = require('socket.io');

const server = http.createServer(app);
const serverPort = 4001;

const io = socketio(server);

io.on('connection', (socket) => {
    console.log('Socket connected')
  
    socket.on('disconnect', () => {
        console.log('Socket disconnected')
    });
});

server.listen(serverPort, () => {
    console.log(`Listening on port ${serverPort}`)
});