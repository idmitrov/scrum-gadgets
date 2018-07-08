const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const config = require('./config');
const Socket = require('./socket');
const Database = require('./database');

const db = new Database(mongoose);
const server = http.createServer(express());
const socket = new Socket(socketio);

try {
  // TODO: Check env and if is production then store logs into a file instead of console.log
  db.connect(config.db.host, config.db.port, config.db.name, { useNewUrlParser: true })
    .then(() => {
      console.log('[db] ready');

      server.listen(config.server.port, () => {
        console.log(`[server] running`);

        socket.connect(server);
      });
    })
    .catch(error => {
      console.log(`[db] ${error.message}`);
    })
} catch (e) {
  console.log(e);
}
