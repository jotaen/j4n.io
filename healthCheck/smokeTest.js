'use strict'

const request = require('supertest')
const config = require('../app/bootstrap/config')
const isValid = require('../test/_isValid')
const body = require('../test/http/_body')

const url = process.env.URL || 'http://www.j4n.io'
const route = '/healthCheckTest_' + (new Date()).getTime()

/* global describe */
/* global it */

describe('Health check against production system', () => {
  it('Call on base URL without credentials results in redirect', (done) => {
    request(url)
      .get('/')
      .expect(301)
      .expect('Content-Type', /json/)
      .expect('Location', 'http://jotaen.net')
      .end(done)
  })

  it('should reject unauthorized write requests', (done) => {
    request(url)
      .put(route)
      .auth('hacker', 'p4ssw0rd')
      .send({
        url: 'http://some.test.url/for?health=check#test',
        status_code: 305
      })
      .expect(401)
      .expect('Content-Type', /json/)
      .end(body(isValid.errorResponse, done))
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
      .end(body(isValid.apiResponse, done))
  })

  it('should retrieve this resource', (done) => {
    request(url)
      .get(route)
      .expect(305)
      .expect('Content-Type', /json/)
      .end(body(isValid.apiResponse, done))
  })

  it('should delete this resource', (done) => {
    request(url)
      .delete(route)
      .auth(config.username, config.password)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(body(isValid.apiResponse, done))
  })
})
