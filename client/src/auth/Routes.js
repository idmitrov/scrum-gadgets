import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import PrivateRoute from '../auth/PrivateRoute';

import Dashboard from '../dashboard/Dashboard';
import Login from '../auth/Login';
import Register from '../auth/Register';

import Settings from '../settings/Settings';
import About from '../about/About';
import NotFound from '../shared/NotFound';

import Poker from '../tool/poker/Poker';
import Daily from '../tool/daily/Daily';
import Retrospective from '../tool/retrospective/Retrospective';

import { appActions } from '../app/AppActions';

export const routesMap = {
  "/": "Dashboard",
  "/login": "Login",
  "/register": "Register",
  "/about": "About",
  "/tool/daily": "Daily",
  "/tool/retrospective": "Restrospective",
  "/tool/poker": "Poker",
  "/settings": "Settings"
};

class Routes extends Component {
  onRouteChange(routePath) {
    let title = routesMap[routePath];

    this.props.setPageTitle(title);
  }

  componentDidMount(prevProps) {
    this.onRouteChange(this.props.location.pathname);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.onRouteChange(this.props.location.pathname);
    }
  }

  render() {
    return(
      <Switch>
        <Route path="/" exact component={Dashboard} />
        
        <PrivateRoute path="/login" exact redirect="/" authenticated={!this.props.authenticated} component={Login} />
        <PrivateRoute path="/register" exact redirect="/" authenticated={!this.props.authenticated} component={Register} />
        
        <Route path="/about" component={About} />
        <Route path="/settings" component={Settings} />

        <PrivateRoute path="/tool/daily" authenticated={this.props.authenticated} component={Daily} />
        <PrivateRoute path="/tool/poker" authenticated={this.props.authenticated} component={Poker} />
        <PrivateRoute path="/tool/retrospective" authenticated={this.props.authenticated} component={Retrospective} />

        <Route component={NotFound} />
      </Switch>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPageTitle: (title) => {
      return dispatch(appActions.setPageTitle(title));
    }
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Routes)
);
