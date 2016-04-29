'use strict'

const config = require('./config')
const db = require('./db')
const odm = require('../odm')
const router = require('../http/router')
const credentials = {
  username: 'admin',
  password: config.password
}

db(config.dbUrl, 'shortlinks').then(() => {
  server.listen(config.port, () => {
    console.log('Server listening on port ' + config.port + '…')
  })
}).catch((error) => {
  console.log('>>> Error during database initialization:\n')
  console.log(error)
})
