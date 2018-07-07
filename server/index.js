const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');

let config = require('./config');
const Socket = require('./socket');
const Database = require('./database');

let db = new Database(mongoose);
const server = http.createServer(express());
const socket = new Socket(socketio);

socket.connect(server);
db.connect(config.db.host, config.db.port, config.db.name);

server.listen(config.server.port, () => {
  console.log(`[server] ready`);
});
