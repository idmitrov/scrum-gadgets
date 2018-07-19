import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { authActions } from './AuthActions';
import { sharedActions } from '../shared/SharedActions';
import { validationConstants } from '../shared/Constants';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.register = this.register.bind(this);
  }

  /**
   * @name handleInputChange
   * @param {Event} e
   */
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  /**
   * @name register
   * @param {Event} e
   */
  register(e) {
    if (this.state.password === this.state.confirmPassword) {
      this.props.register(this.state.email ,this.state.username, this.state.password);
    } else {
      this.props.pushNotificationError(validationConstants.register.passwordDoesNotMatch);
    }
  }

  render() {
    return (
      <div>
        <form>
          <div>
            <TextField
              type="email"
              name="email"
              required
              label="Email"
              autoComplete="you@example.com"
              onChange={this.handleInputChange}
            />
          </div>

          <div>
            <TextField
              type="text"
              name="username"
              required
              label="Username"
              autoComplete="your username"
              onChange={this.handleInputChange}
            />
          </div>

          <div>
            <TextField
              type="password"
              name="password"
              label="Password"
              autoComplete="your password"
              onChange={this.handleInputChange}
            />
          </div>

          <div>
            <TextField
              type="password"
              name="confirmPassword"
              label="Confirm password"
              autoComplete="confirm your password"
              onChange={this.handleInputChange}
            />
          </div>

          <div>
            <p>
              Already have an account ?
              <Link to="/login">Login now</Link>
            </p>
          </div>

          <div>
            <Button variant="contained" color="primary" onClick={this.register}>
              Register
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    /**
     * Dispatch authActions.register with user credentials
     * @name register
     * @desc Dispatch register action with user credentials and trigger and on success
     * dispatch notification with message and type 'success'
     * @param {String} username
     * @param {String} password
     */
    register(email, username, password) {
      return dispatch(authActions.register(email, username, password))
        .then(() => {
          let notifications = [{ message: 'Register successful', type: 'success' }];

          dispatch(sharedActions.setNotifications(notifications));
        });
    },
    /**
     * @name pushNotificationError
     * @desc Dispatch pushNotification action with message and type 'error'
     * @param {String} message
     */
    pushNotificationError(message) {
      return dispatch(sharedActions.pushNotification(message, 'error'));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
