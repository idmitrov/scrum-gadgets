import io from 'socket.io-client';

class Socket {
  constructor(context, url) {
    this.context = context.connect(url);
  }

  /**
   * Emit a given event
   * @name emit
   * @param {String} event
   * @param {Any} data
   */
  emit(event, data) {
    this.context.emit(event, data);
  }

  /**
   * Subscribe to a given event
   * @name subscribe
   * @param {String} event
   * @param {Function} handler
   */
  subscribe(event, handler) {
    this.context.on(event, handler);
  }

  /**
   * Unsubscribe from a given event
   * @name unsubscribe
   * @param {String} event
   * @param {Function} handler
   */
  unsubscribe(event, handler) {
    this.context.removeListener(event, handler);
  }
}

export default new Socket(io, 'http://localhost:4001');
