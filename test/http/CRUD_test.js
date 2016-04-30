'use strict'

const request = require('supertest')
const app = require('../../app/http/app')
const validate = require('./_validate')
const admin = require('./_credentials')

describe('CRUD operations', () => {
  const route = '/foobaz'
  const code = 302
  const url = 'https://foo.baz/myroute?param=1#hash'
  let firstToken = '' // will be set later in the test

  it('PUT should accept and create a new resource', (done) => {
    request(app)
      .put(route)
      .auth(admin.username, admin.password)
      .send({
        url: 'http://example.org/asdf',
        status_code: code
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        validate.shortlink(res.body).then(done)
      })
  })

  it('GET should deliver the previously created resource', (done) => {
    request(app)
      .get(route)
      .expect(code)
      .expect('Content-Type', /json/)
      .end((_, res) => {
        validate.shortlink(res.body).then(done)
      })
  })

  it('GET should send response in correct format, when a specific URI is requested', (done) => {
    request(app)
      .get(route)
      .expect(301)
      .expect('Content-Type', /json/)
      .end((_, res) => {
        validate.shortlink(res.body).then(done)
      })
  })

  it('POST should update the existing resource', (done) => {
    request(app)
      .post(route)
      .auth(admin.username, admin.password)
      .send({
        url: url,
        status_code: 302
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((_, res) => {
        validate.shortlink(res.body).then(done)
      })
  })

  it('GET should return the updated resource', (done) => {
    request(app)
      .get(route)
      .expect(302)
      .end((_, res) => {
        if (res.body.url === url) {
          done()
        }
      })
  })

  it('DELETE should delete the resource', (done) => {
    request(app)
      .delete(route)
      .auth(admin.username, admin.password)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((_, res) => {
        validate.shortlink(res.body).then(done)
      })
  })

  it('GET should return a 404 now', (done) => {
    request(app)
      .get(route)
      .expect(404)
      .expect('Content-Type', /json/)
      .end(done)
  })

  it('DELETE should return a 404 now', (done) => {
    request(app)
      .delete(route)
      .auth(admin.username, admin.password)
      .expect(404)
      .expect('Content-Type', /json/)
      .end(done)
  })

  it('POST should return a 404 now', (done) => {
    request(app)
      .post(route)
      .auth(admin.username, admin.password)
      .send({
        url: url,
        status_code: 302
      })
      .expect(404)
      .expect('Content-Type', /json/)
      .end(done)
  })

  it('POST should create new resources under the base URI with random token', (done) => {
    request(app)
      .post('/')
      .auth(admin.username, admin.password)
      .send({
        url: url,
        status_code: 305
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .expect((res) => {
        firstToken = res.body.token
      })
      .end((_, res) => {
        validate.shortlink(res.body).then(done)
      })
  })

  it('POST should not recreate a resource (i.e. it should return a different URI each time)', (done) => {
    request(app)
      .post('/')
      .auth(admin.username, admin.password)
      .send({
        url: url,
        status_code: 404
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .end((_, res) => {
        if (res.body.token !== firstToken) {
          done()
        }
      })
  })

  it('GET should return the new resource', (done) => {
    request(app)
      .get('/' + firstToken)
      .expect(301)
      .end((_, res) => {
        validate.shortlink(res.body).then(done)
      })
  })
})
