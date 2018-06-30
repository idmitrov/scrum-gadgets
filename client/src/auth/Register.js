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
      this.props.register(this.state.username, this.state.password);
    } else {
      this.props.setValidationError(validationConstants.register.passwordDoesNotMatch);
    }
  }

  render() {
    return (
      <div>
        <form>
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
     * @name register
     * @desc Dispatch register action with user data and trigger Api middleware
     * @param {String} username
     * @param {String} password
     */
    register(username, password) {
      return dispatch(authActions.register(username, password));
    },
    /**
     * @name setValidationError
     * @desc Dispatch setValidationError action with error message
     * @param {String} errorMessage
     */
    setValidationError(errorMessage) {
      return dispatch(sharedActions.setValidationError(errorMessage));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
