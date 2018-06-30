import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import AppReducer from './AppReducer';
import AuthReducer from '../auth/AuthReducer';
import SharedReducer from '../shared/SharedReducer';

import { ApiMiddleware } from '../shared/ApiMiddleware';

const rootReducer = combineReducers({
  app: AppReducer,
  auth: AuthReducer,
  shared: SharedReducer
});

export default createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk, ApiMiddleware)
  )
);

