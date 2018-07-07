import io from 'socket.io-client';

class Socket {
  constructor(context) {
    this.context = context;
  }

  /**
   * Connect to engine (default is socket.io-client)
   * @name connect
   * @param {String} url
   */
  connect(url = 'http://localhost:4001') {
    try {
      this.connection = this.context.connect(url);
    } catch(e) {
      console.log(e);
    }
  }

  /**
   * Emit a given event
   * @name emit
   * @param {String} event
   * @param {Any} data
   */
  emit(event, data) {
    this.connection.emit(event, data);
  }

  /**
   * Subscribe to a given event
   * @name subscribe
   * @param {String} event
   * @param {Function} handler
   */
  subscribe(event, handler) {
    this.connection.on(event, handler);
  }

  /**
   * Unsubscribe from a given event
   * @name unsubscribe
   * @param {String} event
   * @param {Function} handler
   */
  unsubscribe(event, handler) {
    this.connection.removeListener(event, handler);
  }
}

export default new Socket(io);
