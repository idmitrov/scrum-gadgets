import io from 'socket.io-client';

class Socket {
  constructor(engine) {
    this.engine = engine;
  }

  /**
   * Connect to engine (default is socket.io-client)
   * @desc Connect by calling engine.connect()
   * @name connect
   * @param {String} url
   */
  connect(username, token, url = 'http://localhost:4001') {
    try {
      this.connection = this.engine.connect(url, {
        query: { username, token }
      });
    } catch(e) {
      console.log(e);
    }
  }

  /**
   * Disconnect from engine (default is socket.io.client)
   * @desc disconnect by calling engine.disconnect() method
   * @name disconnect
   */
  disconnect() {
    this.connection.disconnect();
  }

  /**
   * Emit a given event
   * @desc Emit event
   * by calling connection.emit() where connection = instance of engine i.e engine()
   * @name emit
   * @param {String} event
   * @param {Any} data
   */
  emit(event, data) {
    this.connection.emit(event, data);
  }

  /**
   * Subscribe to a given event
   * @desc Subscribe to event
   * by calling connection.subscribe() where connection = instance of engine i.e engine()
   * @name subscribe
   * @param {String} event
   * @param {Function} handler
   */
  subscribe(event, handler) {
    this.connection.on(event, handler);
  }

  /**
   * Unsubscribe from a given event
   *  @desc Unsubscribe from event
   * by calling connection.subremoveListenerscribe() where connection = instance of engine i.e engine()
   * @name unsubscribe
   * @param {String} event
   * @param {Function} handler
   */
  unsubscribe(event, handler) {
    this.connection.removeListener(event, handler);
  }
}

export default new Socket(io);
