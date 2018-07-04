export const sharedActionTypes = {
  callApi: 'API_CALL',
  emitSocket: 'EMIT_SOCKET',
  subscribeSocket: 'SOCKET_SUBSCRIBE',
  setValidationError: 'VALIDATION_ERROR_SET'
};

export const sharedActions = {
  /**
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
