import io from 'socket.io-client';

import { sharedActionTypes } from './SharedActions';

export const SocketMiddleware = (store) => (next) => (action) => {
  if (action.type === sharedActionTypes.sendSocket || action.type === sharedActionTypes.receiveSocket) {

    let socket = io.connect('http://localhost:4001');
    console.log(socket);

    socket.emit(action.payload.event, action.payload.data);
    console.log('SOCKETS MIDDLEWARE')
  }

  next(action);
}
