import { sharedActionTypes } from './SharedActions';

export const SocketMiddleware = (store) => (next) => (action) => {
    if (action.type === sharedActionTypes.sendSocket || action.type === sharedActionTypes.receiveSocket) {
        console.log('SOCKETS MIDDLEWARE')
    }

    next(action);
} 