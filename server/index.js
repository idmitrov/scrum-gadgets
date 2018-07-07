const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');

const Database = require('./database');
let config = require('./config');

let db = new Database(mongoose);
db.connect(config.db.host, config.db.port, config.db.name);

const server = http.createServer(express());

const io = socketio(server);
let connections = [];

io.on('connection', (socket) => {
  console.log('[socket] connected');
  connections.push(socket);

  socket.on('disconnect', () => {
    connections.splice(connections.indexOf(socket), 1);

    console.log('[socket] disconnected');
  });

  socket.on('request-clients', () => {
    socket.emit('response-clients', connections.map(c => c.id));
  })
});

server.listen(config.server.port, () => {
  console.log(`[server] ready`)
});
