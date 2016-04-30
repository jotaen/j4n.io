'use strict'

const request = require('supertest')
const app = require('../../app/http/app')
const validate = require('./_validate')
const admin = require('./_credentials')

describe('GET /', () => {
  it('should list all shortlinks on base URI', (done) => {
    request(app)
      .get('/')
      .auth(admin.username, admin.password)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((_, res) => {
        if (res.body instanceof Array) {
          validate.shortlink(res.body[0]).then(done)
        }
      })
  })
})
