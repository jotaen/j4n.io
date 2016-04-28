'use strict'

const request = require('supertest')
const server = require('./_server')
const admin = require('./_credentials')
const hacker = {username: 'h4ck3r', password: '3vil'}

describe('authentication', () => {
  const route = '/test123'

  it('PUT /... with authorization passes', (done) => {
    request(server)
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
    request(server)
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
    request(server)
      .put(route)
      .send({
        'url': 'http://example.org/asdf',
        status_code: 301
      })
      .expect(401)
      .end(done)
  })

  it('POST /... with authorization passes', (done) => {
    request(server)
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
    request(server)
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
    request(server)
      .post(route)
      .send({
        'url': 'http://example.org/1234',
        status_code: 301
      })
      .expect(401)
      .end(done)
  })

  it('POST / with authorization passes', (done) => {
    request(server)
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
    request(server)
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
    request(server)
      .post('/')
      .send({
        'url': 'http://example.org/qwer',
        status_code: 301
      })
      .expect(401)
      .end(done)
  })

  it('DELETE /... with authorization passes', (done) => {
    request(server)
      .delete(route)
      .auth(admin.username, admin.password)
      .expect(200)
      .end(done)
  })

  it('DELETE /... with wrong credentials fails', (done) => {
    request(server)
      .delete(route)
      .auth(hacker.username, hacker.password)
      .expect(401)
      .end(done)
  })

  it('DELETE /... without any credentials fails', (done) => {
    request(server)
      .delete(route)
      .expect(401)
      .end(done)
  })

  it('GET / with authorization passes', (done) => {
    request(server)
      .get('/')
      .auth(admin.username, admin.password)
      .expect(200)
      .end(done)
  })

  it('GET / with wrong credentials fails', (done) => {
    request(server)
      .get('/')
      .auth(hacker.username, hacker.password)
      .expect(401)
      .end(done)
  })

  it('GET / without any credentials results in a redirect', (done) => {
    request(server)
      .get('/')
      .expect(301)
      .expect('Location', 'http://jotaen.net')
      .end(done)
  })
})
