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
        url: 'http://localhost:3001/api/user/login',
        method: 'POST',
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
  register: (username, password) => (dispatch) => {
    return dispatch({
      type: authActionTypes.register,
      payload: { username, password },
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
    return dispatch({
      type: authActionTypes.logout
    });
  }
}
