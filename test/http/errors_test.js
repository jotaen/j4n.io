'use strict'

const request = require('supertest')
const app = require('../../app/http/app')
const admin = require('./_credentials')
const validate = require('./_validate')

describe('errors', () => {
  const nonExistentRoute = '/sud8f6g6aqq1u2e'

  it('GET should return 404 on non existing resource', (done) => {
    request(app)
      .get(nonExistentRoute)
      .auth(admin.username, admin.password)
      .expect(404)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) done(err)
        else validate.error(res.body).then(done)
      })
  })

  it('DELETE should return 404 on non existing resource', (done) => {
    request(app)
      .delete(nonExistentRoute)
      .auth(admin.username, admin.password)
      .expect(404)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) done(err)
        else validate.error(res.body).then(done)
      })
  })

  it('POST should return 404 if resource if not available', (done) => {
    request(app)
      .post(nonExistentRoute)
      .auth(admin.username, admin.password)
      .send({
        url: 'https://yahoo.org',
        status_code: 301
      })
      .expect(404)
      .expect('Content-Type', /json/)
      .end(done)
  })

  it('[PRECONDITION] Create a resource (needed for the next test case)', (done) => {
    request(app)
      .put('/lalala')
      .auth(admin.username, admin.password)
      .send({
        url: 'http://example.org/qwer',
        status_code: 308
      })
      .expect(201)
      .end(done)
  })

  it('PUT should refuse to overwrite an existing resource', (done) => {
    request(app)
      .put('/lalala')
      .auth(admin.username, admin.password)
      .send({
        url: 'http://example.org/1234',
        status_code: 307
      })
      .expect(405)
      .expect('Allow', 'GET, POST, DELETE')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) done(err)
        else validate.error(res.body).then(done)
      })
  })
})
