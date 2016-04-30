'use strict'

const request = require('supertest')
const app = require('../../app/http/app')
const admin = require('./_credentials')
const hacker = {username: 'h4ck3r', password: '3vil'}

describe('authentication', () => {
  const route = '/test123'

  it('PUT /... with authorization passes', (done) => {
    request(app)
      .put(route)
      .auth(admin.username, admin.password)
      .send({
        'url': 'http://example.org/asdf',
        status_code: 301
      })
      .expect(201)
      .end(done)
  })

  it('PUT /... with wrong credentials fails', (done) => {
    request(app)
      .put(route)
      .auth(hacker.username, hacker.password)
      .send({
        'url': 'http://example.org/asdf',
        status_code: 301
      })
      .expect(401)
      .end(done)
  })

  it('PUT /... without any credentials fails', (done) => {
    request(app)
      .put(route)
      .send({
        'url': 'http://example.org/asdf',
        status_code: 301
      })
      .expect(401)
      .end(done)
  })

  it('POST /... with authorization passes', (done) => {
    request(app)
      .post(route)
      .auth(admin.username, admin.password)
      .send({
        'url': 'http://example.org/1234',
        status_code: 301
      })
      .expect(200)
      .end(done)
  })

  it('POST /... with wrong credentials fails', (done) => {
    request(app)
      .post(route)
      .auth(hacker.username, hacker.password)
      .send({
        'url': 'http://example.org/1234',
        status_code: 301
      })
      .expect(401)
      .end(done)
  })

  it('POST /... without any credentials fails', (done) => {
    request(app)
      .post(route)
      .send({
        'url': 'http://example.org/1234',
        status_code: 301
      })
      .expect(401)
      .end(done)
  })

  it('POST / with authorization passes', (done) => {
    request(app)
      .post('/')
      .auth(admin.username, admin.password)
      .send({
        'url': 'http://example.org/qwer',
        status_code: 301
      })
      .expect(201)
      .end(done)
  })

  it('POST / with wrong credentials fails', (done) => {
    request(app)
      .post('/')
      .auth(hacker.username, hacker.password)
      .send({
        'url': 'http://example.org/qwer',
        status_code: 301
      })
      .expect(401)
      .end(done)
  })

  it('POST / without any credentials fails', (done) => {
    request(app)
      .post('/')
      .send({
        'url': 'http://example.org/qwer',
        status_code: 301
      })
      .expect(401)
      .end(done)
  })

  it('DELETE /... with authorization passes', (done) => {
    request(app)
      .delete(route)
      .auth(admin.username, admin.password)
      .expect(200)
      .end(done)
  })

  it('DELETE /... with wrong credentials fails', (done) => {
    request(app)
      .delete(route)
      .auth(hacker.username, hacker.password)
      .expect(401)
      .end(done)
  })

  it('DELETE /... without any credentials fails', (done) => {
    request(app)
      .delete(route)
      .expect(401)
      .end(done)
  })

  it('GET / with authorization passes', (done) => {
    request(app)
      .get('/')
      .auth(admin.username, admin.password)
      .expect(200)
      .end(done)
  })

  it('GET / with wrong credentials fails', (done) => {
    request(app)
      .get('/')
      .auth(hacker.username, hacker.password)
      .expect(401)
      .end(done)
  })

  it('GET / without any credentials results in a redirect', (done) => {
    request(app)
      .get('/')
      .expect(301)
      .expect('Location', 'http://jotaen.net')
      .end(done)
  })
})
