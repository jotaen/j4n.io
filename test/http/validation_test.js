'use strict'

const request = require('supertest')
const app = require('../../app/http/app')
const config = require('../../app/bootstrap/config')
const validate = require('./_validate')

describe('validation', () => {
  const route = '/asdfqwer'

  it('PUT should fail if parameter `url` is not given (since it is required)', (done) => {
    request(app)
      .put(route)
      .auth(config.username, config.password)
      .send({})
      .expect(422)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) done(err)
        else validate.error(res.body).then(done)
      })
  })

  it('PUT should reject the request, if parameter `url` is invalid', (done) => {
    request(app)
      .put(route)
      .auth(config.username, config.password)
      .send({'url': 'not_a_valid_url'})
      .expect(422)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) done(err)
        else validate.error(res.body).then(done)
      })
  })

  it('PUT should reject the request, if parameter `status_code` is invalid', (done) => {
    request(app)
      .put(route)
      .auth(config.username, config.password)
      .send({
        'url': 'http://google.de',
        'status_code': 'not_a_valid_status_code'
      })
      .expect(422)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) done(err)
        else validate.error(res.body).then(done)
      })
  })

  it('POST should reject the request for a specific URI, if parameter `url` is invalid', (done) => {
    request(app)
      .post(route)
      .auth(config.username, config.password)
      .send({'url': 'not_a_valid_url'})
      .expect(422)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) done(err)
        else validate.error(res.body).then(done)
      })
  })

  it('POST should reject the request, if parameter `status_code` is invalid', (done) => {
    request(app)
      .post(route)
      .auth(config.username, config.password)
      .send({
        'url': 'http://google.de',
        'status_code': 'not_a_valid_status_code'
      })
      .expect(422)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) done(err)
        else validate.error(res.body).then(done)
      })
  })

  it('POST should reject the request for base URI, if parameter `url` is invalid', (done) => {
    request(app)
      .post('/')
      .auth(config.username, config.password)
      .send({'url': 'not_a_valid_url'})
      .expect(422)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) done(err)
        else validate.error(res.body).then(done)
      })
  })

  it('POST should reject the request for base URI, if parameter `url` is not given', (done) => {
    request(app)
      .post('/')
      .auth(config.username, config.password)
      .send({})
      .expect(422)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) done(err)
        else validate.error(res.body).then(done)
      })
  })
})
