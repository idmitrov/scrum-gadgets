class Socket {
  constructor(engine, server) {
    this.engine = engine;
    this.connections = {};
  }

  connect(server) {
    try {
      this.context = this.engine(server);

      this.context
        .use((socket, next) => {
          // TODO: authenticate socket.token
          let authenticated = socket.handshake.query.token;

          if (authenticated && authenticated !== 'undefined') {
            socket.bearer = socket.handshake.query.token;
            socket.username = socket.handshake.query.username;

            next();
          }

          next(new Error('[socket] unauthenticated'));
        })
        .on('connection', (socket) => {
          if (this.connections[socket.username]) {
            console.log('[socket] socket connections increased');
            this.connections[socket.username].connections += 1;
          } else {
            console.log('[socket] new socket connected');

            this.connections[socket.username] = {
              connections: 1,
              socket
            }
          }

          socket.on('disconnect', () => {
            if (this.connections[socket.username].connections <= 1) {
              delete this.connections[socket.username];
              console.log('[socket] disconnected');
            } else {
              this.connections[socket.username].connections -= 1;
              console.log('[socket] socket connections decreased');
            }
          });

          socket.on('request-clients', () => {
            let clients = Object.keys(this.connections).join(', ');

            this.context.sockets.emit('response-clients', clients);
          })
        });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Socket;
