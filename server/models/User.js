const mongoose = require('mongoose');
const encryption = require('../utils/encryption');

const config = require('../config');

let userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: '{PATH} is required'
  },
  password: {
    type: String,
    required: '{PATH} is required'
  },
  avatar: {
    type: String
  },
  roles: [
    { type: String }
  ],
  salt: {
    type: String
  },
  email: {
    type: String,
    required: '{PATH} is required'
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema)

/**
 * Seed admin user
 * @name seedAdmin
 * @desc seed admin user if db is empty
 */
User.seedAdmin = () => {
  User.findOne({ username: 'admin' })
    .then(foundUser => {
      if (!foundUser) {
        let salt = encryption.generateSalt();

        let adminUser = {
          username: config.db.admin.user,
          email: config.db.admin.email,
          salt: salt,
          password: encryption.generateHashPass(salt, 'admin'),
          roles: config.db.admin.roles
        }

        User.create(adminUser)
          .then((user) => {
            console.log('[db] admin seeded')
          })
          .catch(err => {
            console.log('Seeding user error', err)
          });
      }
    });
}

module.exports = User;
