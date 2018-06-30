import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, authenticated, redirect, ...rest }) => (
  <Route
    {...rest}
    render = {
      (props) => authenticated ? (
        <Component {...rest} {...props} />
      ) : (
        <Redirect to={redirect || '/login'} />
      )
    }
  />
);

export default PrivateRoute;
