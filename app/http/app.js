'use strict'

const bodyParser = require('body-parser')
const randomToken = require('randomstring')
const express = require('express')
const router = express()
const trimSlashes = require('../trimSlashes')
const request = require('./requestSchema')
const validator = require('./validator')
const protector = require('./protector')
const redirector = require('./redirector')
const auth = require('../auth')
const handle = require('./handleError')
const shortlinks = require('../odm')
const config = require('../bootstrap/config')
const admin = auth('admin', config.password)

module.exports = router

router.use(bodyParser.json())

router.get(
  '/',
  redirector('/', 'http://jotaen.net'),
  protector(admin),
  (req, res) => {
    shortlinks.list().then((result) => {
      res
        .status(200)
        .send(result)
    })
  }
)

router.get(
  '/:token',
  (req, res) => {
    const token = trimSlashes(req.params.token)
    shortlinks.find(token).then((data) => {
      if (data) {
        res
          .status(data.status_code)
          .header('Location', data.url)
          .send(data)
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
  protector(admin),
  validator(request.shortlink),
  (req, res) => {
    const token = trimSlashes(req.params.token)

    shortlinks.create(token, req.body.url, req.body.status_code)
    .then((shortlink) => {
      res
        .status(201)
        .send(shortlink)
    }).catch((error) => {
      if (error.message === 'ALREADY_EXISTS') handle.methodNotAllowed(res)
      else handle.internalError(res)
    })
  }
)

router.post(
  '/',
  protector(admin),
  validator(request.shortlink),
  (req, res) => {
    let token = randomToken.generate({
      charset: 'alphanumeric',
      length: 5
    })

    shortlinks.create(token, req.body.url, req.body.status_code)
    .then((shortlink) => {
      res
        .status(201)
        .send(shortlink)
    }).catch(() => {
      handle.internalError(res)
    })
  }
)

router.post(
  '/:token',
  protector(admin),
  validator(request.shortlink),
  (req, res) => {
    const token = trimSlashes(req.params.token)
    const data = {
      url: req.body.url,
      status_code: req.body.status_code
    }
    shortlinks.update(token, data).then((shortlink) => {
      if (shortlink) {
        res
          .status(200)
          .send(shortlink)
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
  protector(admin),
  (req, res) => {
    const token = trimSlashes(req.params.token)
    shortlinks.delete(token).then((shortlink) => {
      if (shortlink) {
        res
          .status(200)
          .send(shortlink)
      } else {
        handle.notFound(res)
      }
    }).catch(() => {
      handle.internalError(res)
    })
  }
)
