const crypto = require('crypto');

module.exports = {
  generateSalt: () => crypto.randomBytes(128).toString('base64'),
  generateHashPass: (salt, pass) => crypto.createHmac('sha256', salt).update(pass).digest('hex')
}
