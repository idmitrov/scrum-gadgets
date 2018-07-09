const passport = require('passport');
const { Strategy } = require('passport-local');
const jwt = require('jsonwebtoken');
const encryption = require('./utils/encryption');
const User = require('./models/User');
const confing = require('./config');

const localOptions = { session: false, passReqToCallback: true };

const localStrategy = new Strategy(localOptions, (req, username, password, done) => {
  User.findOne({ username: username })
    .then(foundUser => {
      if(!foundUser) {
        return done({ message: 'Invalid credentials!' });
      }

      let hashedPassword = encryption.generateHashPass(foundUser.salt, password.trim());

      if (foundUser.password !== hashedPassword) {
        return done({ message: 'Invalid credentials!' });
      }

      let payload = {
        sub: foundUser._id,
        password: foundUser.password
      };

      let token = jwt.sign(payload, confing.auth.secret);

      let userData = {
        username: foundUser.username,
        roles: foundUser.roles,
        email: foundUser.email,
        avatar: foundUser.avatar
      }

      done(null, token, userData);
    });
});

module.exports = () => {
  passport.use('local-login', localStrategy)
}
