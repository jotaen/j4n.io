'use strict'

const request = require('supertest')
const app = require('../../app/http/app')
const config = require('../../app/bootstrap/config')
const validate = require('./_validate')

describe('GET /', () => {
  it('should list all shortlinks on base URI', (done) => {
    request(app)
      .get('/')
      .auth(config.username, config.password)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) done(err)
        else if (res.body instanceof Array) validate.shortlink(res.body[0]).then(done)
      })
  })
})
