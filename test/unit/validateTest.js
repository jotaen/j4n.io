'use strict'

const validate = require('../../app/validate')

describe('#validate()', () => {
  it('should accept correct shortlink data', (done) => {
    validate({
      url: 'http://google.com',
      status_code: 301
    }).then(done)
  })

  it('should reject incomplete shortlink data (missing status_code)', (done) => {
    validate({
      url: 'http://google.com'
    }).catch(() => done())
  })

  it('should reject incomplete shortlink data (missing url)', (done) => {
    validate({
      status_code: 300
    }).catch(() => done())
  })

  it('should reject incorrect URLs', (done) => {
    validate({
      url: 'incorrect_URL',
      status_code: 305
    }).catch(() => done())
  })

  it('should reject invalid status codes', (done) => {
    validate({
      url: 'https://bing.com',
      status_code: 'a'
    }).catch(() => done())
  })
})
