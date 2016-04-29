'use strict'

const assert = require('assert')
const convert = require('../../app/convert')
const validate = require('../_validate_output')

describe('convert', () => {
  it('should leave correct data untouched', () => {
    const result = convert.input({
      token: 'asdf',
      url: 'http://googe.de',
      status_code: 302,
      created: new Date(),
      updated: new Date()
    })

    assert(validate(result))
  })

  it('should cast the types into the desired format', () => {
    const result = convert.input({
      token: 12345,
      url: 'http://googe.de',
      status_code: '302',
      created: new Date(),
      updated: new Date()
    })

    assert(validate(result))
  })

  it('should liberate the data from unknown properties', () => {
    const result = convert.input({
      token: 'asdf',
      foo: 'bar',
      url: 'http://googe.de',
      status_code: 302,
      created: new Date(),
      updated: new Date(),
      lalala: 'hooray!!!'
    })

    assert(validate(result))
    assert(Object.keys(result).length === 5)
  })

  it('should not expect the presence of any property', () => {
    const result = convert.input({})
    assert(Object.keys(result).length === 0)
  })

  it('should remove the mongo-id on output', () => {
    const result = convert.output({
      _id: 'a6028bc9b87a6816aa8dc069c7e901b3',
      token: 'asdf',
      url: 'http://googe.de',
      status_code: 302,
      created: '2011-03-17T12:00:00.182Z',
      updated: '2011-03-17T12:00:00.182Z'
    })
    assert(validate(result))
    assert(Object.keys(result).length === 5)
  })
})
