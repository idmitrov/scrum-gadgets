import { sharedActionTypes } from './SharedActions';

const sharedDefaults = {
  errors: [],
  notifications: []
};

const SharedReducer = (state = sharedDefaults, action) => {
  switch(action.type) {
    case sharedActionTypes.resetNotifications:
    case sharedActionTypes.setNotifications:
    case sharedActionTypes.addNotification:
    case sharedActionTypes.removeNotifications: {
      return Object.assign({}, state, {
        notifications: action.payload
      });
    }
    case sharedActionTypes.setValidationError: {
      return state;
    }
    default: return state;
  }
}

export default SharedReducer;
