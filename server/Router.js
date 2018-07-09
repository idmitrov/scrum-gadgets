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

    // route.get('*', (req, res) => {
    //   let PathToindexFile = path.resolve(__dirname, '../client/', 'public', 'index.html');

    //   res.sendFile(PathToindexFile);
    // })
  }
}

module.exports = new Router();
