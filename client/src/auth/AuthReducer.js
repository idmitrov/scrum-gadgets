import { authActionTypes } from './AuthActions';

const authDefaults = {
  authenticated: false,
  authorized: false
};

const AuthReducer = (state = authDefaults, action) => {
  switch(action.type) {
    case authActionTypes.loggedin: {
      return {
        ...state,
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
        authenticated: false
      }
    }
    default: return state;
  }
}

export default AuthReducer;
