import { authEnpoints } from '../auth/ApiEndpoints';

export const authActionTypes = {
  login: 'AUTH_LOGIN',
  loggedin: 'AUTH_LOGGEDIN',
  register: 'AUTH_REGISTER',
  registered: 'AUTH_REGISTERED',
  logout: 'AUTH_LOGOUT',
  loggedout: 'AUTH_LOGGEDOUT'
};

export const authActions = {
  /**
   * @name login
   * @desc dispatch authActionType.login | AUTH_LOGIN
   * @param {String} username
   * @param {String} password
   */
  login: (username, password) => (dispatch) => {
    // TODO: Extract API endpoints
    return dispatch({
      type: authActionTypes.login,
      payload: {
        url: authEnpoints.login.url,
        method: authEnpoints.login.method,
        data: {
          username,
          password
        }
      },
      success: authActionTypes.loggedin,
      meta: {
        api: true
      }
    });
  },
  /**
   * @name register
   * @desc dispatch authActionType.register
   * @param {String} username
   * @param {String} password
   */
  register: (email, username, password) => (dispatch) => {
    return dispatch({
      type: authActionTypes.register,
      payload: {
        url: authEnpoints.register.url,
        method: authEnpoints.register.method,
        data: {
          email,
          username,
          password
        }
      },
      success: authActionTypes.registered,
      meta: {
        api: true
      }
    });
  },
  /**
   * @name logout
   * @desc Logout authenticated user
   */
  logout: () => (dispatch) => {
    return new Promise((resolve, reject) => {
      resolve(
        dispatch({
          type: authActionTypes.logout
        })
      );
    })
  }
}
