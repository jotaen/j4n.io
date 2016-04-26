'use strict'

/*eslint no-console: 0*/

const express = require('express')
const router = require('../http/router')
const logging = require('morgan')
const db = require('./db')
const odm = require('../odm')
const config = require('./config')
const server = express()

const credentials = {
  username: 'admin',
  password: config.password
}

if (config.debug) {
  console.log('Debug mode active')
  server.use(logging('dev'))
}

db(config.db_url, 'shortlinks').then((collection) => {
  const shortlinks = odm(collection)
  router(server, credentials, shortlinks)
  server.listen(config.port, () => {
    console.log('Server listening on port ' + config.port + '…')
  })
}).catch((error) => {
  console.log('>>> Error during database initialization:\n')
  console.log(error)
})
