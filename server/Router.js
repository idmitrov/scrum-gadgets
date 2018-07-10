const express = require('express');
const path = require('path');

const {
  authController
} = require('./controllers');

class Router {
  constructor() {
    this.prefix = '/api';
  }

  init(route) {
    route.use(express.static(path.resolve(__dirname, '../', 'public')));

    route
      .post(`${this.prefix}/user/login`, authController.login);
    route
      .post(`${this.prefix}/user/register`, authController.register);
  }
}

module.exports = new Router();
