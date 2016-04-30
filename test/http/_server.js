'use strict'

const db = require('../../app/bootstrap/db')
const config = require('../../app/bootstrap/config')

const now = new Date()

before((done) => {
  db.init(config.dbUrl, 'shortlinks-system-test-' + now.toISOString()).then(() => {
    done()
  }).catch((error) => {
    console.log(error)
    console.log('\n')
    console.log('>>> In order to run this test, you need to have a mongodb and')
    console.log('>>> provide the DB_HOST variable to the test process. E.g.')
    console.log('>>> DB_HOST=localhost:27017 npm test')
    process.exit(1)
  })
})
