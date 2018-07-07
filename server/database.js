let mongoose = require('mongoose');

class Database {
  constructor(engine) {

    this.engine = engine;
  }

  connect(host, port, name) {
    try {
      this.connectionString = `mongodb://${host}:${port}/${name}`;

      this.engine.connect(this.connectionString, {
        useNewUrlParser: true
      });

      this.host = host;
      this.port = port;
      this.name = name;
      this.connection = this.engine.connection;

      this.connection.once('open', () => {
        console.log('[db] ready');
      });

      this.connection.on('error', (err) => {
        console.error('[db] error:', err.message);
      });
    } catch(e) {
      console.log(e);
    }
  }
}

module.exports = Database;
