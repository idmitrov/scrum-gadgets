import AppConfig from '../app/AppConfig';
import { sharedActions } from '../shared/SharedActions';

// TODO: Find a good way to determine environment
const env = 'dev';
const { host, port } = AppConfig[env].api;

export const ApiMiddleware = (store) => (next) => (action) => {
  if (action.meta && action.meta.api) {
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

    return new Promise((resolve, reject) => {
      // TODO: Check for loading meta and
      // if is set dispatch LOADING action,
      // to prevent user interaction during fetching data
      fetch(`//${host}:${port}/api${action.payload.url}`, options)
        .then((response) => {
          if (!response.ok) {
            throw response;
          }

          if (/application\/json/.test(response.headers.get('Content-Type'))) {
            return response.json();
          }

          return response.text();
        })
        .then((response) => {
          if (response.errors && response.errors.length) {
            throw response;
          }

          resolve(store.dispatch({
            type: action.success,
            payload: response.data
          }));
        })
        .catch((response) => {
          reject(response);

          // TODO: REPLACE CONSOLE WITH LOGGER
          if (!response) {
            console.log(`Unexpected error: ${response}`);
          } else {
            if (response.status) {
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
              store.dispatch(sharedActions.setNotifications(response.errors));
            }
          }
        });
      });
  }

  next(action);
}
