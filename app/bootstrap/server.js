'use strict'

const config = require('./config')
const db = require('./db')
const odm = require('../odm')
const app = require('../http/app')
const credentials = {
  username: 'admin',
  password: config.password
}

db.init(config.dbUrl, 'shortlinks').then(() => {
  app.listen(config.port, () => {
    console.log('Server listening on port ' + config.port + '…')
  })
}).catch((error) => {
  console.log('>>> Error during database initialization:\n')
  console.log(error)
  process.exit(1)
})
