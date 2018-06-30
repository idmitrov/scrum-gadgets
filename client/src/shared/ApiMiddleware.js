export const ApiMiddleware = store => next => action => {
  if (action.meta && action.meta.api) {
    // TODO: Replace it with fetch() and real API endpoints
    setTimeout(() => {
      console.log('API RESPONSE')
      store.dispatch({
        type: action.success,
        payload: {}
      });
    }, 1000);
  }

  next(action);
}
