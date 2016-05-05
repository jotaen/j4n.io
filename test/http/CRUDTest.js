'use strict'

const request = require('supertest')
const app = require('../../app/http/app')
const config = require('../../app/bootstrap/config')
const isValid = require('../_isValid')
const body = require('./_body')

// The tests in this suite are dependent on one another and
// need to be executed in this order
describe('API CRUD operations', () => {
  const route = '/foobaz'
  const code = 302
  const url = 'https://foo.baz/myroute?param=1#hash'
  let firstToken = '' // will be set later in the test
  let firstStatusCode = 0

  it('PUT should accept and create a new resource', (done) => {
    request(app)
      .put(route)
      .auth(config.username, config.password)
      .send({
        url: 'http://example.org/asdf',
        status_code: code
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .end(body(isValid.apiResponse, done))
  })

  it('GET should deliver the previously created resource', (done) => {
    request(app)
      .get(route)
      .expect(code)
      .expect('Content-Type', /json/)
      .end(body(isValid.apiResponse, done))
  })

  it('GET should send response in correct format, when a specific URI is requested', (done) => {
    request(app)
      .get(route)
      .expect(302)
      .expect('Content-Type', /json/)
      .end(body(isValid.apiResponse, done))
  })

  it('POST should update the existing resource', (done) => {
    request(app)
      .post(route)
      .auth(config.username, config.password)
      .send({
        url: url,
        status_code: 302
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(body(isValid.apiResponse, done))
  })

  it('GET should return the updated resource', (done) => {
    request(app)
      .get(route)
      .expect(302)
      .end((err, res) => {
        if (err) done()
        else if (res.body.url === url) done()
      })
  })

  it('DELETE should delete the resource', (done) => {
    request(app)
      .delete(route)
      .auth(config.username, config.password)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(body(isValid.apiResponse, done))
  })

  it('GET should return a 404 now', (done) => {
    request(app)
      .get(route)
      .expect(404)
      .expect('Content-Type', /json/)
      .end(body(isValid.errorResponse, done))
  })

  it('DELETE should return a 404 now', (done) => {
    request(app)
      .delete(route)
      .auth(config.username, config.password)
      .expect(404)
      .expect('Content-Type', /json/)
      .end(body(isValid.errorResponse, done))
  })

  it('POST should return a 404 now', (done) => {
    request(app)
      .post(route)
      .auth(config.username, config.password)
      .send({
        url: url,
        status_code: 302
      })
      .expect(404)
      .expect('Content-Type', /json/)
      .end(body(isValid.errorResponse, done))
  })

  it('POST should create new resources under the base URI with random token', (done) => {
    request(app)
      .post('/')
      .auth(config.username, config.password)
      .send({
        url: url,
        status_code: 305
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) done(err)
        else if (isValid.apiResponse(res.body)) done()
        firstToken = res.body.token
        firstStatusCode = res.body.status_code
      })
  })

  it('POST should not recreate a resource (i.e. it should return a different URI each time)', (done) => {
    request(app)
      .post('/')
      .auth(config.username, config.password)
      .send({
        url: url,
        status_code: 404
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) done(err)
        else if (res.body.token !== firstToken) done()
      })
  })

  it('GET should return the new resource', (done) => {
    request(app)
      .get('/' + firstToken)
      .expect(firstStatusCode)
      .end(body(isValid.apiResponse, done))
  })

  it('should list all shortlinks on base URI', (done) => {
    request(app)
      .get('/')
      .auth(config.username, config.password)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) done(err)
        else if (res.body instanceof Array && isValid.apiResponse(res.body[0])) done()
      })
  })
})
