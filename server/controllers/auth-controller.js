const passport = require('passport');
const encryption = require('../utils/encryption');
const User = require('../models/User');

let passportAuth = (req, res) => {
  passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      return res
        .status(200)
        .json({ errors: [{ message: err.message }], data: null });
    }

    if (userData.message) {
      return res
        .status(200)
        .json({
          errors: [{ message: userData.message }],
          data: null
        })
    }

    res.json({
      errors: [],
      data: {
        ...userData,
        token
      }
    })
  })(req, res)
}

module.exports = {
  login: (req, res) => {
    // TODO: Validate req.body
    return passportAuth(req, res)
  },
  register: (req, res) => {
    const salt = encryption.generateSalt();

    const reqUser = {
      username: req.body.username,
      password: encryption.generateHashPass(salt, req.body.password),
      email: req.body.email,
      salt,
    }

    User.create(reqUser)
      .then(() => {
        passportAuth(req, res)
      })
      .catch((error) => {
        return res
          .status(200)
          .json({ data: null, errors: [{ message: error.message }] });
      });
  }
}
