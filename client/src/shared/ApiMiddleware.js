export const ApiMiddleware = store => next => action => {
  if (action.meta && action.meta.api) {
    // TODO: Replace it with fetch() and real API endpoints
    store.dispatch({
      type: action.success,
      payload: {}
    });
  }

  next(action);
}
