'use strict'

const request = require('supertest')
const config = require('../app/bootstrap/config')
const validate = require('../test/http/_validate')

const url = 'http://j4n.io'
const now = new Date()
const route = '/healthCheckTest_' + now.getTime()

/* global describe */
/* global it */

describe('Health check against production system', () => {
  it('Call on URL results in redirect', (done) => {
    request(url)
      .get('/')
      .expect(301)
      .expect('Location', 'http://jotaen.net')
      .end(done)
  })

  it('should reject unauthorized requests', (done) => {
    request(url)
      .put(route)
      .auth('hacker', 'p4ssw0rd')
      .send({
        url: 'http://some.test.url/for?health=check#test',
        status_code: 305
      })
      .expect(401)
      .expect('Content-Type', /json/)
      .end(done)
  })

  it('should store new resources', (done) => {
    request(url)
      .put(route)
      .auth(config.username, config.password)
      .send({
        url: 'http://some.test.url/for?health=check#test',
        status_code: 305
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) done(err)
        else validate.shortlink(res.body).then(done)
      })
  })

  it('should retrieve this resource', (done) => {
    request(url)
      .get(route)
      .expect(305)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) done(err)
        else validate.shortlink(res.body).then(done)
      })
  })

  it('should delete this resource', (done) => {
    request(url)
      .delete(route)
      .auth(config.username, config.password)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) done(err)
        else validate.shortlink(res.body).then(done)
      })
  })
})
