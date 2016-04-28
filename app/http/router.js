'use strict'

const bodyParser = require('body-parser')
const randomToken = require('randomstring')
const trimSlashes = require('../trimSlashes')
const request = require('./request')
const validator = require('./validator')
const protector = require('./protector')
const redirector = require('./redirector')
const auth = require('../auth')
const handle = require('./handleError')

module.exports = (server, credentials, shortlinks) => {
  const admin = auth(credentials.username, credentials.password)

  server.use(bodyParser.json())

  server.get('/', redirector('/', 'http://jotaen.net'), protector(admin), (req, res) => {
    shortlinks.list().then((result) => {
      res
        .status(200)
        .send(result)
    })
  })

  server.get('/:token', (req, res) => {
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
  })

  server.put('/:token', protector(admin), validator(request.shortlink), (req, res) => {
    const token = trimSlashes(req.params.token)

    shortlinks.create(token, req.body.url, req.body.status_code)
    .then((shortlink) => {
      res.status(201).send(shortlink)
    }).catch((error) => {
      if (error.message === 'ALREADY_EXISTS') {
        handle.methodNotAllowed(res)
      } else {
        handle.internalError(res)
      }
    })
  })

  server.post('/', protector(admin), validator(request.shortlink), (req, res) => {
    let token = randomToken.generate({
      charset: 'alphanumeric',
      length: 5
    })

    shortlinks.create(token, req.body.url, req.body.status_code)
    .then((shortlink) => {
      res.status(201).send(shortlink)
    }).catch(() => {
      handle.internalError(res)
    })
  })

  server.post('/:token', protector(admin), validator(request.shortlink), (req, res) => {
    const token = trimSlashes(req.params.token)
    const data = {}
    if (req.body.status_code) {
      data.status_code = req.body.status_code
    }
    if (req.body.url) {
      data.url = req.body.url
    }
    shortlinks.update(token, data).then((shortlink) => {
      if (shortlink) {
        res.status(200).send(shortlink)
      } else {
        handle.notFound(res)
      }
    }).catch(() => {
      handle.internalError(res)
    })
  })

  server.delete('/:token', protector(admin), (req, res) => {
    const token = trimSlashes(req.params.token)
    shortlinks.delete(token).then((shortlink) => {
      if (shortlink) {
        res.status(200).send(shortlink)
      } else {
        handle.notFound(res)
      }
    }).catch(() => {
      handle.internalError(res)
    })
  })
}
