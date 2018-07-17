import { sharedActionTypes } from './SharedActions';

const sharedDefaults = {
  errors: [],
  notifications: []
};

const SharedReducer = (state = sharedDefaults, action) => {
  switch(action.type) {
    case sharedActionTypes.resetNotifications: {
      return Object.assign({}, state, {
        notifications: action.payload
      });
    }
    case sharedActionTypes.setNotifications: {
      return Object.assign({}, state, {
        notifications: action.payload
      });
    }
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
