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

    if (action.payload.method !== 'GET' && action.payload.data) {
      options.body = JSON.stringify(action.payload.data);
    }

    return fetch(action.payload.url, options)
      .then((response) => {
        if (!response.ok) {
          Promise.reject(response);
        } else {
          const contentType = response.headers.get('Content-Type');

          if (/application\/json/.test(contentType)) {
            return response.json();
          }

          return response.text();
        }
      })
      .then((response) => {
        if (response.errors && response.errors.length) {
          Promise.reject(response.errors);
        } else if (response.errors && !response.errors.length) {
          Promise.resolve(store.dispatch({
            type: action.success,
            payload: response.data
          }));
        }
      })
      .catch((response) => {
        if (response.status) {
        // TODO: Handle HTTP Errors
          switch(response.status) {
            case 404:
              console.log(`Error 404: ${response.statusText}`);
              break;
            case 500:
              console.log(`Error 500: ${response.statusText}`);
              break;
            default:
              console.log(`Something went wrong ${response.statusText}`);
          }
        } else if (response.errors) {
          // TODO: Handle validation errors
          console.log(response.errors);
        } else {
          // TODO: Handle Unexpected Errors
          console.log(`Unexpected error: ${response}`);
        }
      });
  }

  next(action);
}
