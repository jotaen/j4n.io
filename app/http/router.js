'use strict'

const bodyParser = require('body-parser')
const randomToken = require('randomstring')
const trimSlashes = require('../trimSlashes')
const request = require('./request')
const validator = require('./validator')
const protector = require('./protector')
const redirector = require('./redirector')
const auth = require('../auth')

const handle = res => error => {
  if (error === 'NOT_FOUND') {
    res.status(404).send({
      message: 'Error: resource not found',
      code: 404
    })
  } else {
    res.status(500).send({
      message: 'Internal server error',
      code: 500
    })
  }
}

module.exports = (server, credentials, shortlinks) => {
  const admin = auth(credentials.username, credentials.password)

  server.use(bodyParser.json())

  server.get('/', redirector('/', 'http://jotaen.net'), protector(admin), (req, res) => {
    shortlinks.list().then((result) => {
      res.status(200).send(result)
    })
  })

  server.get('/:token', (req, res) => {
    const token = trimSlashes(req.params.token)
    shortlinks.find(token).then((data) => {
      res.status(data.status_code)
      .header('Location', data.url)
      .send(data)
    }).catch(handle(res))
  })

  server.put('/:token', protector(admin), validator(request.shortlink), (req, res) => {
    const token = trimSlashes(req.params.token)

    shortlinks.create(token, req.body.url, req.body.status_code)
    .then((shortlink) => {
      res.status(201).send(shortlink)
    }).catch((error) => {
      if (error === 'ALREADY_EXISTS') {
        res.status(405).header('Allow', 'GET, POST').send({
          message: 'Error - PUT is not allowed on an existing resource',
          code: 405
        })
      } else {
        handle(res)(error)
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
    }).catch(handle(res))
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
      res.status(200).send(shortlink)
    }).catch(handle(res))
  })

  server.delete('/:token', protector(admin), (req, res) => {
    const token = trimSlashes(req.params.token)
    shortlinks.delete(token).then((shortlink) => {
      res.status(200).send(shortlink)
    }).catch(handle(res))
  })
}
