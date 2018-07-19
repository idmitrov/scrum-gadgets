import { sharedActionTypes } from './SharedActions';

const sharedDefaults = {
  errors: [],
  notifications: []
};

const SharedReducer = (state = sharedDefaults, action) => {
  switch(action.type) {
    // SET NOTIFICATIONS
    case sharedActionTypes.setNotifications: {
      return Object.assign({}, state, {
        notifications: action.payload
      });
    }
    // RESET NOTIFICATIONS
    case sharedActionTypes.resetNotifications: {
      return Object.assign({}, state, {
        notifications: sharedDefaults.notifications
      });
    }
    // PUSH NOTIFICATION
    case sharedActionTypes.pushNotification: {
      let notifications = state.notifications.concat(action.payload);

      return Object.assign({}, state, { notifications });
    }
    // REMOVE NOTIFICATION
    case sharedActionTypes.spliceNotifications: {
      let notifications = state.notifications.slice()
      notifications.splice(action.payload.index, action.payload.count);

      return Object.assign({}, state, { notifications });
    }
    // POP NOTIFICATION
    case sharedActionTypes.popNotification: {
      let notifications = state.notifications.slice();
      notifications.splice(state.notifications.length - 1, 1);

      return Object.assign({}, state, { notifications });
    }
    // ADD ERROR
    case sharedActionTypes.addError: {
      let errors = state.errors.concat(action.payload);

      return Object.assign({}, state, { errors });
    }
    default: return state;
  }
}

export default SharedReducer;
