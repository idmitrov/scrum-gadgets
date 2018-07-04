const app = require('express')();
const http = require('http');
const socketio = require('socket.io');

const server = http.createServer(app);
const serverPort = 4001;

const io = socketio(server);
let connections = [];

io.on('connection', (socket) => {
  console.log('Socket connected');
  connections.push(socket);

  socket.on('disconnect', () => {
    connections.splice(connections.indexOf(socket), 1);

    console.log('Socket disconnected');
  });

  socket.on('publish', (data) => {
    console.log(data);

    socket.emit('response', 'Server response');
  })
});

server.listen(serverPort, () => {
  console.log(`Listening on port ${serverPort}`)
});
