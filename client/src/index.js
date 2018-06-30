import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router-dom";
import history from './app/AppHistory';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';

import 'typeface-roboto';
import './index.css';

import App from './app/App';
import store from './app/AppStore';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <MuiThemeProvider theme={createMuiTheme()}>
    <Router history={history}>
      <Provider store={store}>
        <App name="Scrum Gadgets"/>
      </Provider>
    </Router>
  </MuiThemeProvider>,
  document.getElementById('app')
);

registerServiceWorker();
