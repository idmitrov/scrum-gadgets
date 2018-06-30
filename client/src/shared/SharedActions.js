export const sharedActionTypes = {
  callApi: 'API_CALL',
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
  }
};
