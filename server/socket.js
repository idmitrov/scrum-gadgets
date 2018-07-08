class Socket {
  constructor(engine, server) {
    this.engine = engine;
    this.connections = [];
  }

  connect(server) {
    try {
      this.context = this.engine(server);

      this.context
        .use((socket, next) => {
          // TODO: Get token from handShake and compare it with DB
          let authenticated = socket.handshake.query.token;

          if (authenticated && authenticated !== 'undefined') {
            next();
          }

          next(new Error('[socket] unauthenticated'));
        })
        .on('connection', (socket) => {
          console.log('[socket] connected');
          this.connections.push(socket);

          socket.on('disconnect', () => {
            this.connections.splice(this.connections.indexOf(socket), 1);

            console.log('[socket] disconnected');
          });

          socket.on('request-clients', () => {
            socket.emit('response-clients', this.connections.map(c => c.id));
          })
        });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Socket;
