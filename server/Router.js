const express = require('express');
const path = require('path');

class Router {
  constructor() {
    this.prefix = '/api';
  }

  init(route) {
    route.use(express.static(path.resolve(__dirname, '../', 'public')));

    route
      .post(`${this.prefix}/user/login`, (req, res) => {
        console.log('LOGIN');
        // TODO: Call controller and return DB data
        return res
          .status(200)
          .json({ data: null, errors: [] })
      });

    route.get('*', (req, res) => {
      let PathToindexFile = path.resolve(__dirname, '../client/', 'public', 'index.html');

      res.sendFile(PathToindexFile);
    })
  }
}

module.exports = new Router();
