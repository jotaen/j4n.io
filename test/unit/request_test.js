'use strict'

const Joi = require('joi')
const shortlinkSchema = require('../../app/http/request').shortlink

const assertAccept = (data, schema, done) => {
  Joi.validate(data, schema, (err) => {
    if (!err) {
      done()
    }
  })
}

const assertReject = (data, schema, done) => {
  Joi.validate(data, schema, (err) => {
    if (err) {
      done()
    }
  })
}

describe('request_schema', () => {
  it('should accept correct shortlink data', (done) => {
    assertAccept({
      url: 'http://google.com',
      status_code: 301
    }, shortlinkSchema, done)
  })

  it('should accept correct shortlink data with minimum parameters', (done) => {
    assertAccept({
      url: 'http://google.com'
    }, shortlinkSchema, done)
  })

  it('should reject incorrect URLs', (done) => {
    assertReject({
      url: 'incorrect_URL'
    }, shortlinkSchema, done)
  })

  it('should reject invalid status codes', (done) => {
    assertReject({
      url: 'https://bing.com',
      status_code: 'a'
    }, shortlinkSchema, done)
  })
})
