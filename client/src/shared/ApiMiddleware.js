export const ApiMiddleware = store => next => action => {
  if (action.meta && action.meta.api) {
    // TODO: Replace it with fetch() and real API endpoints
    let options = {
      method: action.payload.method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    if (action.payload.method !== 'GET') {
      options.body = JSON.stringify(action.payload.data);
    }

    fetch(action.payload.url, options)
      .then((response) => {
        if (response.errors && !response.errors.length) {
          store.dispatch({
            type: action.success,
            payload: response
          });
        }
      });
  }

  next(action);
}
