const express = require('express');

const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');

class App {
  constructor(core) {
    this.core = core;
  }

  init() {
    this.core.use(passport.initialize());
    this.core.use(cors());
    this.core.use(bodyParser.json());
    this.core.use(bodyParser.urlencoded({ extended: true }));

    return this.core;
  }
}

module.exports = new App(express());
