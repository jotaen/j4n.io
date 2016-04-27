'use strict'

const request = require('supertest')
const server = require('./_server')
const admin = require('./_credentials')
const validate = require('./_validate')

describe('errors', () => {
  const nonExistentRoute = '/sud8f6g6aqq1u2e'

  it('PUT should not be allowed to be called on the base URI', (done) => {
    request(server)
      .put('/')
      .auth(admin.username, admin.password)
      .send({'url': 'not_a_valid_url'})
      .expect(405)
      .expect('Allow', 'GET, POST')
      .expect('Content-Type', /json/)
      .end((_, res) => {
        validate.error(res.body).then(done)
      })
  })

  it('GET should return 404 on non existing resource', (done) => {
    request(server)
      .get(nonExistentRoute)
      .auth(admin.username, admin.password)
      .send({'url': 'not_a_valid_url'})
      .expect(404)
      .expect('Allow', 'GET, POST')
      .expect('Content-Type', /json/)
      .end((_, res) => {
        validate.error(res.body).then(done)
      })
  })

  it('DELETE should return 404 on non existing resource', (done) => {
    request(server)
      .put(nonExistentRoute)
      .auth(admin.username, admin.password)
      .send({'url': 'not_a_valid_url'})
      .expect(404)
      .expect('Allow', 'GET, POST')
      .expect('Content-Type', /json/)
      .end((_, res) => {
        validate.error(res.body).then(done)
      })
  })

  it('POST should return 404 if resource if not available', (done) => {
    request(server)
      .post(nonExistentRoute)
      .auth(admin.username, admin.password)
      .send({'url': 'https://yahoo.org'})
      .expect(404)
      .expect('Content-Type', /json/)
      .end(done)
  })

  it('[PRECONDITION] Create a resource (needed for the next test case)', (done) => {
    request(server)
      .put('/lalala')
      .auth(admin.username, admin.password)
      .send({'url': 'http://example.org/qwer'})
      .expect(201)
      .end(done)
  })

  it('PUT should refuse to overwrite an existing resource', (done) => {
    request(server)
      .put('/lalala')
      .auth(admin.username, admin.password)
      .send({'url': 'http://example.org/1234'})
      .expect(405)
      .expect('Allow', 'GET, POST, DELETE')
      .expect('Content-Type', /json/)
      .end((_, res) => {
        validate.error(res.body).then(done)
      })
  })
})
