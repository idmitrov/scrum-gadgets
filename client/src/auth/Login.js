import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { authActions } from './AuthActions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: null,
      password: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.login = this.login.bind(this);
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
   * @name login
   * @param {Event} e
   */
  login(e) {
    this.props.login(this.state.username, this.state.password);
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
            <p>
              Don't you have an account ?
              <Link to="/register">Register now</Link>
            </p>
          </div>

          <div>
            <Button variant="contained" color="primary" onClick={this.login}>
              Login
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
     * @name login
     * @desc Dispatch login action with user data and trigger Api middleware
     */
    login(username, password) {
      return dispatch(authActions.login(username, password));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
