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
          // TODO: Implement authentication
          socket.bearer = socket.handshake.query.token;
          socket.username = socket.handshake.query.username;
          socket.voted = false;

          next();
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
            let clients = Object
              .keys(this.connections)
              .map((connectionName) => {
                let connection = this.connections[connectionName];

                return {
                  name: connectionName,
                  token: connection.socket.bearer,
                  id: connection.socket.id
                }
              });

              console.log(clients)

            this.context.sockets.emit('response-clients', clients);
          })
        });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Socket;
