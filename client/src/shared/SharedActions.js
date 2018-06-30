export const sharedActionTypes = {
  callApi: 'API_CALL',
  setValidationError: 'VALIDATION_ERROR_SET'
};

export const sharedActions = {
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
