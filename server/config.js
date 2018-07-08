const env = process.env.NODE_ENV || 'dev';

const config = {
  dev: {
    db: {
      host: 'localhost',
      port: 27017,
      name: 'scrumgadgets',
      admin: {
        username: 'admin',
        email: 'admin@scrumgadgets.com',
        roles: ['Admin']
      }
    },
    server: {
      port: 3001
    },
    auth: {
      secret: 'secret'
    }
  },
  production: {
    db: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      name: process.env.DB_NAME,
      admin: {
        username: process.env.DB_ADMIN_USERNAME,
        email: process.env.DB_ADMIN_EMAIL,
        roles: process.env.DB_ROLES
      }
    },
    server: {
      port: process.env.SERVER_PORT
    },
    auth: {
      secret: process.env.AUTH_SECRET
    }
  }
}

module.exports = config[env];
