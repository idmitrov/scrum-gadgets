import AppConfig from '../app/AppConfig';
import { sharedActions } from '../shared/SharedActions';

// TODO: Find a good way to determine environment
const env = 'dev';
const { host, port } = AppConfig[env].api;

export const ApiMiddleware = (store) => (next) => (action) => {
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

    return fetch(`//${host}:${port}/api${action.payload.url}`, options)
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
          store.dispatch(sharedActions.setNotifications(response.errors));

          Promise.reject(response.errors);
        } else if (response.errors && !response.errors.length) {
          Promise.resolve(store.dispatch({
            type: action.success,
            payload: response.data
          }));
        }
      })
      .catch((response) => {
        if (!response) {
          // TODO: Handle Unexpected Errors
          console.log(`Unexpected error: ${response}`);
        } else {
          if (response.status) {
            // TODO: Handle HTTP Errors
            switch (response.status) {
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
          }
        }
      });
  }

  next(action);
}
