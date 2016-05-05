'use strict'

const bodyParser = require('body-parser')
const randomToken = require('randomstring')
const express = require('express')
const router = express()
const apiResponse = require('../transform').apiResponse
const validator = require('./validator')
const protector = require('./protector')
const redirector = require('./redirector')
const sanitizer = require('./sanitizer')
const handle = require('./errors')
const shortlinks = require('../odm')
const config = require('../bootstrap/config')

module.exports = router

router.use(bodyParser.json())

router.get(
  '/',
  redirector('/', 'http://jotaen.net'),
  protector(config.username, config.password),
  (req, res) => {
    shortlinks.list().then((shortlinkList) => {
      res
        .status(200)
        .send(shortlinkList.map(apiResponse))
    })
  }
)

router.get(
  '/:token',
  sanitizer(),
  (req, res) => {
    shortlinks.find(req.params.token).then((shortlink) => {
      if (shortlink) {
        res
          .status(shortlink.status_code)
          .header('Location', shortlink.url)
          .send(apiResponse(shortlink))
      } else {
        handle.notFound(res)
      }
    }).catch(() => {
      handle.internalError(res)
    })
  }
)

router.put(
  '/:token',
  protector(config.username, config.password),
  validator(),
  sanitizer(),
  (req, res) => {
    shortlinks.create(req.params.token, req.body.url, req.body.status_code)
    .then((shortlink) => {
      res
        .status(201)
        .send(apiResponse(shortlink))
    }).catch((error) => {
      if (error.message === 'ALREADY_EXISTS') handle.methodNotAllowed(res, 'GET, POST, DELETE')
      else handle.internalError(res)
    })
  }
)

router.post(
  '/',
  protector(config.username, config.password),
  validator(),
  sanitizer(),
  (req, res) => {
    let token = randomToken.generate({
      charset: 'alphanumeric',
      length: 5
    })

    shortlinks.create(token, req.body.url, req.body.status_code)
    .then((shortlink) => {
      res
        .status(201)
        .send(apiResponse(shortlink))
    }).catch(() => {
      handle.internalError(res)
    })
  }
)

router.post(
  '/:token',
  protector(config.username, config.password),
  validator(),
  sanitizer(),
  (req, res) => {
    shortlinks.update(req.params.token, req.body.url, req.body.status_code)
    .then((shortlink) => {
      if (shortlink) {
        res
          .status(200)
          .send(apiResponse(shortlink))
      } else {
        handle.notFound(res)
      }
    }).catch(() => {
      handle.internalError(res)
    })
  }
)

router.delete(
  '/:token',
  protector(config.username, config.password),
  sanitizer(),
  (req, res) => {
    shortlinks.delete(req.params.token)
    .then((shortlink) => {
      if (shortlink) {
        res
          .status(200)
          .send(apiResponse(shortlink))
      } else {
        handle.notFound(res)
      }
    }).catch(() => {
      handle.internalError(res)
    })
  }
)

router.all('*', (req, res) => {
  handle.methodNotAllowed(res, 'GET, POST, PUT, DELETE')
})
