const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const config = require('./config');

require('./auth')();

const Router = require('./Router');
const App = require('./App');
const Database = require('./database');
const Socket = require('./socket');

const db = new Database(mongoose);
const server = http.createServer(App.init());
const socket = new Socket(socketio);

Router.init(App.core);

try {
  // TODO: Check env and if is production then store logs into a file instead of console.log
  db.connect(config.db.host, config.db.port, config.db.name, { useNewUrlParser: true })
    .then(() => {
      console.log('[db] ready');
      db.seed();

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
