import { authActionTypes } from './AuthActions';

const authDefaults = {
  user: null,
  authenticated: false,
  authorized: false
};

const AuthReducer = (state = authDefaults, action) => {
  switch(action.type) {
    case authActionTypes.loggedin: {
      return {
        ...state,
        user: action.payload,
        authenticated: true
      }
    }
    case authActionTypes.registered: {
      return {
        ...state,
        authenticated: true
      }
    }
    case authActionTypes.logout: {
      return {
        ...state,
        user: null,
        authenticated: false
      }
    }
    default: return state;
  }
}

export default AuthReducer;
