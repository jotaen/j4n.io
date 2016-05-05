'use strict'

const request = require('supertest')
const app = require('../../app/http/app')
const config = require('../../app/bootstrap/config')
const isValid = require('../_isValid')
const body = require('./_body')

describe('API errors', () => {
  describe('400 Bad request', () => {
    const route = '/asdfqwer'

    it('PUT should fail if parameter `url` is not given (since it is required)', (done) => {
      request(app)
        .put(route)
        .auth(config.username, config.password)
        .send({})
        .expect(400)
        .expect('Content-Type', /json/)
        .end(body(isValid.errorResponse, done))
    })

    it('PUT should fail if parameter `status_code` is not given (since it is required)', (done) => {
      request(app)
        .put(route)
        .auth(config.username, config.password)
        .send({'url': 'http://google.de'})
        .expect(400)
        .expect('Content-Type', /json/)
        .end(body(isValid.errorResponse, done))
    })

    it('PUT should reject the request, if parameter `url` is invalid', (done) => {
      request(app)
        .put(route)
        .auth(config.username, config.password)
        .send({'url': 'not_a_valid_url'})
        .expect(400)
        .expect('Content-Type', /json/)
        .end(body(isValid.errorResponse, done))
    })

    it('PUT should reject the request, if parameter `status_code` is invalid', (done) => {
      request(app)
        .put(route)
        .auth(config.username, config.password)
        .send({
          'url': 'http://google.de',
          'status_code': 'not_a_valid_status_code'
        })
        .expect(400)
        .expect('Content-Type', /json/)
        .end(body(isValid.errorResponse, done))
    })

    it('PUT should reject the request, if unknown parameters are present', (done) => {
      request(app)
        .put(route)
        .auth(config.username, config.password)
        .send({
          'url': 'http://google.de',
          'status_code': 301,
          'unknown_parameter': 123
        })
        .expect(400)
        .expect('Content-Type', /json/)
        .end(body(isValid.errorResponse, done))
    })

    it('POST should reject the request for a specific URI, if parameter `url` is invalid', (done) => {
      request(app)
        .post(route)
        .auth(config.username, config.password)
        .send({'url': 'not_a_valid_url'})
        .expect(400)
        .expect('Content-Type', /json/)
        .end(body(isValid.errorResponse, done))
    })

    it('POST should reject the request, if parameter `status_code` is invalid', (done) => {
      request(app)
        .post(route)
        .auth(config.username, config.password)
        .send({
          'url': 'http://google.de',
          'status_code': 'not_a_valid_status_code'
        })
        .expect(400)
        .expect('Content-Type', /json/)
        .end(body(isValid.errorResponse, done))
    })

    it('POST should reject the request, if unknown parameters are present', (done) => {
      request(app)
        .post(route)
        .auth(config.username, config.password)
        .send({
          'url': 'http://google.de',
          'status_code': 301,
          'unknown_parameter': 123
        })
        .expect(400)
        .expect('Content-Type', /json/)
        .end(body(isValid.errorResponse, done))
    })

    it('POST should reject the request for base URI, if parameter `url` is invalid', (done) => {
      request(app)
        .post('/')
        .auth(config.username, config.password)
        .send({'url': 'not_a_valid_url'})
        .expect(400)
        .expect('Content-Type', /json/)
        .end(body(isValid.errorResponse, done))
    })

    it('POST should reject the request for base URI, if parameter `url` is not given', (done) => {
      request(app)
        .post('/')
        .auth(config.username, config.password)
        .send({})
        .expect(400)
        .expect('Content-Type', /json/)
        .end(body(isValid.errorResponse, done))
    })

    it('POST should fail if parameter `status_code` is not given (since it is required)', (done) => {
      request(app)
        .post(route)
        .auth(config.username, config.password)
        .send({'url': 'http://google.de'})
        .expect(400)
        .expect('Content-Type', /json/)
        .end(body(isValid.errorResponse, done))
    })
  })

  describe('404 Not found', () => {
    const nonExistentRoute = '/sud8f6g6aqq1u2e'

    it('GET should return 404 on non existing resource', (done) => {
      request(app)
        .get(nonExistentRoute)
        .auth(config.username, config.password)
        .expect(404)
        .expect('Content-Type', /json/)
        .end(body(isValid.errorResponse, done))
    })

    it('DELETE should return 404 on non existing resource', (done) => {
      request(app)
        .delete(nonExistentRoute)
        .auth(config.username, config.password)
        .expect(404)
        .expect('Content-Type', /json/)
        .end(body(isValid.errorResponse, done))
    })

    it('POST should return 404 if resource if not available', (done) => {
      request(app)
        .post(nonExistentRoute)
        .auth(config.username, config.password)
        .send({
          url: 'https://yahoo.org',
          status_code: 301
        })
        .expect(404)
        .expect('Content-Type', /json/)
        .end(body(isValid.errorResponse, done))
    })
  })

  describe('405 Method not allowed', () => {
    const newRoute = '/lalala'
    before('Create a resource (needed for the next test case)', (done) => {
      request(app)
        .put(newRoute)
        .auth(config.username, config.password)
        .send({
          url: 'http://example.org/qwer',
          status_code: 308
        })
        .expect(201)
        .end(done)
    })

    it('PUT should refuse to overwrite an existing resource', (done) => {
      request(app)
        .put(newRoute)
        .auth(config.username, config.password)
        .send({
          url: 'http://example.org/1234',
          status_code: 307
        })
        .expect(405)
        .expect('Allow', 'GET, POST, DELETE')
        .expect('Content-Type', /json/)
        .end(body(isValid.errorResponse, done))
    })

    it('should refuse unkown methods, such as PATCH', (done) => {
      request(app)
        .patch(newRoute)
        .auth(config.username, config.password)
        .expect(405)
        .expect('Allow', 'GET, POST, PUT, DELETE')
        .expect('Content-Type', /json/)
        .end(body(isValid.errorResponse, done))
    })
  })
})
