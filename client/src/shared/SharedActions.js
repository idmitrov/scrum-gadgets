export const sharedActionTypes = {
  callApi: 'API_CALL',
  emitSocket: 'EMIT_SOCKET',
  subscribeSocket: 'SOCKET_SUBSCRIBE',
  setValidationError: 'VALIDATION_ERROR_SET',
  setNotifications: 'NOTIFICATION_SET',
  removeNotifications: 'NOTIFICATIONS_REMOVE',
  resetNotifications: 'NOTIFICATIONS_RESET'
};

export const sharedActions = {
  /**
   * Clear all state notifications i.e set empty array
   * @name resetNotifications
   * @desc dispatch sharedActionTypes.resetNotifications
   */
  resetNotifications: () => (dispatch) => {
    return dispatch({
      type: sharedActionTypes.resetNotifications,
      payload: []
    });
  },
  /**
   * Splice state notifications array by given index and count of notifications to splice
   * @name removeNotifications
   * @desc dispatch sharedActionTypes.removeNotifications
   * @param {Number} index = 0
   * @param {Number} count = 1
   */
  removeNotifications: (index = 0, count = 1) => (dispatch, getState) => {
    let state = getState();
    let notificationsUpdate = state.shared.notifications.slice();

    notificationsUpdate.splice(index, count);

    return dispatch({
      type: sharedActionTypes.removeNotifications,
      payload: notificationsUpdate
    });
  },
  /**
   * Push a new notification into state notifications array
   * @name setNotifications
   * @desc dispatch sharedActionTypes.setNotifications
   * @param {Array} notifications
   */
  setNotifications: (notifications) => (dispatch) => {
    return dispatch({
      type: sharedActionTypes.setNotifications,
      payload: notifications
    });
  },
  /**
   * Push a validation error into state errors array
   * @name setValidationError
   * @desc dispatch sharedActionTypes.setValidationError with error type and message
   * @param {String} errorMessage
   */
  setValidationError: (errorMessage) => (dispatch) => {
    return dispatch({
      type: sharedActionTypes.setValidationError,
      payload: {
        type: 'validation',
        message: errorMessage
      }
    });
  },
  emitSocket: (event, data) => (dispatch) => {
    return dispatch({
      type: sharedActionTypes.emitSocket,
      payload: {
        event,
        data
      }
    });
  },
  subscribeSocket: (event, handler) => (dispatch) => {
    return dispatch({
      type: sharedActionTypes.subscribeSocket,
      payload: {
        event,
        handler
      }
    });
  }
};
