'use strict'

module.exports = {
  dbUrl: 'mongodb://' + (process.env.DB_USER && process.env.DB_PASSWORD ? process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@' : '') + (process.env.DB_HOST || '127.0.0.1'),
  port: process.env.PORT || 3000,
  username: process.env.API_USERNAME || 'admin',
  password: process.env.API_PASSWORD || 'a'
}
