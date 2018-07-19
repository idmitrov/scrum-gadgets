export const sharedActionTypes = {
  callApi: 'API_CALL',
  pushNotification: 'NOTIFICATION_PUSH',
  spliceNotifications: 'NOTIFICATIONS_SPLICE',
  popNotification: 'NOTIFICATION_POP',
  setNotifications: 'NOTIFICATIONS_SET',
  resetNotifications: 'NOTIFICATIONS_RESET',
  setError: 'SET_ERROR'
};

export const sharedActions = {
  /**
   * Dispatch sharedActionTypes.pushNotification action
   * @name pushNotification
   * @desc Dispatch sharedActionTypes.pushNotification action
   * along with the notification type and message
   * @param {String} message
   * @param {String} type = 'info'
   */
  pushNotification: (message, type = 'info') => (dispatch) => {
    return dispatch({
      type: sharedActionTypes.pushNotification,
      payload: { message, type }
    });
  },
  /**
   * Dispatch sharedActionType.popNotification action
   * @name popNotification
   */
  popNotification: () => (dispatch) => {
    return dispatch({
      type: sharedActionTypes.popNotification
    });
  },
  /**
   * Dispatch sharedActionTypes.spliceNotifications
   * @name spliceNotifications
   * @desc Dispatch sharedActionTypes.spliceNotifications
   * along with the starting index and the count of notifications to splice
   * @param {Number} index
   * @param {Number} count = 1
   */
  spliceNotifications: (index, count = 1) => (dispatch) => {
    return dispatch({
      type: sharedActionTypes.spliceNotifications,
      payload: { index, count }
    });
  },
  /**
   * Dispatch sharedActionTypes.setNotifications
   * @name setNotifications
   * @desc Dispatch sharedActionTypes.setNotifications with given notifications
   * @param {Array} notifications
   */
  setNotifications: (notifications) => (dispatch) => {
    return dispatch({
      type: sharedActionTypes.setNotifications,
      payload: notifications
    });
  },
  /**
   * Dispatch sharedActionTypes.resetNotifications
   * @name resetNotifications
   * @desc Dispatch sharedActionTypes.resetNotifications
   */
  resetNotifications: () => (dispatch) => {
    return dispatch({
      type: sharedActionTypes.resetNotifications
    });
  },
  /**
   * Dispatch sharedActionTypes.addError
   * @name addError
   * @desc Dispatch sharedActionTypes.addError along with the error type and message
   * @param {String} message
   * @param {String} type = 'error'
   */
  addError: (message, type = 'error') => (dispatch) => {
    return dispatch({
      type: sharedActionTypes.setError,
      payload: { message, type }
    });
  }
};
