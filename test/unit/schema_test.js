'use strict'

const assert = require('assert')
const schema = require('../../app/schema')

describe('schema', () => {
  it('should leave correct data untouched', () => {
    const result = schema.input({
      token: 'asdf',
      url: 'http://googe.de',
      status_code: 302,
      created: new Date(),
      updated: new Date()
    })

    assert(schema.validate(result))
  })

  it('should cast the types into the desired format', () => {
    const result = schema.input({
      token: 12345,
      url: 'http://googe.de',
      status_code: '302',
      created: new Date(),
      updated: new Date()
    })

    assert(schema.validate(result))
  })

  it('should liberate the data from unknown properties', () => {
    const result = schema.input({
      token: 'asdf',
      foo: 'bar',
      url: 'http://googe.de',
      status_code: 302,
      created: new Date(),
      updated: new Date(),
      lalala: 'hooray!!!'
    })

    assert(schema.validate(result))
    assert(Object.keys(result).length === 5)
  })

  it('should not expect the presence of any property', () => {
    const result = schema.input({})
    assert(Object.keys(result).length === 0)
  })

  it('should remove the mongo-id on output', () => {
    const result = schema.output({
      _id: 'a6028bc9b87a6816aa8dc069c7e901b3',
      token: 'asdf',
      url: 'http://googe.de',
      status_code: 302,
      created: '2011-03-17T12:00:00.182Z',
      updated: '2011-03-17T12:00:00.182Z'
    })
    assert(schema.validate(result))
    assert(Object.keys(result).length === 5)
  })
})
