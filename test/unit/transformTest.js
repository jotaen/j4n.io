'use strict'

const assert = require('assert')
const transform = require('../../app/transform')
const isValid = require('../_isValid')

describe('#transform', () => {
  describe('#apiResponse()', () => {
    it('should remove the mongo-id on output', () => {
      const result = transform.apiResponse({
        _id: 'a6028bc9b87a6816aa8dc069c7e901b3',
        token: 'asdf',
        url: 'http://googe.de',
        status_code: 302,
        created: new Date(),
        updated: new Date()
      })
      assert(isValid.apiResponse(result))
    })
  })

  describe('#apiInput()', () => {
    it('should leave correct data untouched', () => {
      const result = transform.apiInput({
        url: 'http://googe.de',
        status_code: 302
      })
      assert(isValid.apiInput(result))
    })

    it('should remove any additional (unknown) properties', () => {
      const result = transform.apiInput({
        url: 'http://googe.de',
        additional_property: ['bad', 'values'],
        status_code: 302,
        unknown_field: 'bad_value'
      })
      assert(isValid.apiInput(result))
    })

    it('should cast the status code to number', () => {
      const result = transform.apiInput({
        url: 'http://googe.de',
        status_code: '302'
      })
      assert(isValid.apiInput(result))
    })
  })

  describe('#token()', () => {
    it('should always return a string', () => {
      const input = 12345
      const expect = '12345'
      const result = transform.token(input)
      assert(result === expect)
    })

    it('should trim nothing, when there is no leading or trailing slash', () => {
      const input = 'foo'
      const expect = 'foo'
      const result = transform.token(input)
      assert(result === expect)
    })

    it('should trim the leading slash', () => {
      const input = '/foo'
      const expect = 'foo'
      const result = transform.token(input)
      assert(result === expect)
    })

    it('should trim all leading slashes', () => {
      const input = '//////foo'
      const expect = 'foo'
      const result = transform.token(input)
      assert(result === expect)
    })

    it('should trim the trailing slash', () => {
      const input = 'foo/'
      const expect = 'foo'
      const result = transform.token(input)
      assert(result === expect)
    })

    it('should trim all trailing slashes', () => {
      const input = 'foo////'
      const expect = 'foo'
      const result = transform.token(input)
      assert(result === expect)
    })

    it('should leave inner slashes untouched', () => {
      const input = 'foo/baz///bar'
      const expect = 'foo/baz///bar'
      const result = transform.token(input)
      assert(result === expect)
    })
  })
})
