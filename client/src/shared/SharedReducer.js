import { sharedActionTypes } from './SharedActions';

const sharedDefaults = {
  errors: [],
  notifications: []
};

const SharedReducer = (state = sharedDefaults, action) => {
  switch(action.type) {
    case sharedActionTypes.setValidationError: {
      return state;
    }
    default: return state;
  }
}

export default SharedReducer;
