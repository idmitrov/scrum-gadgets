const passport = require('passport');

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

  }
}
