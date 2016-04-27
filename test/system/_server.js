'use strict'

const express = require('express')
const db = require('../../app/bootstrap/db')
const config = require('../../app/bootstrap/config')
const router = require('../../app/http/router')
const odm = require('../../app/odm')
const credentials = require('./_credentials')
const server = express()

const now = new Date()

db(config.dbUrl, 'shortlinks-system-test-' + now.toISOString()).then((collection) => {
  const shortlinks = odm(collection)
  router(server, credentials, shortlinks)
  run()  /* global run */
}).catch((error) => {
  console.log(error)
  console.log('\n')
  console.log('>>> In order to run this test, you need to have a mongodb and')
  console.log('>>> provide the DB_HOST variable to the test process. E.g.')
  console.log('>>> DB_HOST=localhost:27017 npm test')
})

module.exports = server
