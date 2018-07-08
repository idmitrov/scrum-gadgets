const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (role) => (req, res, next) => {
  let authHeaders = req.headers.authorization;

  if (!authHeaders) {
    return res.status(401).send('Missing token')
  }

  let token = authHeaders.split(' ')[1];
  if (!token) {
    return res.status(401).send('Invalid token')
  }

  jwt.verify(token, config.auth.secret, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send('Error while handling the token');
    }

    let userId = decoded.sub,
      password = decoded.password;

    if (!userId || !password) {
      return res
        .status(401)
        .send('Invalid token');
    }

    User.findById(userId)
      .then(foundUser => {
        if (!foundUser || foundUser.password !== password) {
          return res
            .status(401)
            .send('Invalid token');
        }

        if (role && foundUser.roles.indexOf(role) === -1) {
            return res.json({
              error: [{ message: 'Not authorized to do that' }],
              data: null
            });
        }

        req.user = foundUser;
        next();
      });
  })
}
