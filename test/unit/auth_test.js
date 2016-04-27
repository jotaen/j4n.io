'use strict'

const assert = require('assert')
const auth = require('../../app/auth')

describe('auth', () => {
  it('should return true with correct credentials', () => {
    const check = auth('usr', 'pwd')
    const login = {name: 'usr', pass: 'pwd'}
    assert.strictEqual(check(login), true)
  })

  it('should return false with wrong username', () => {
    const check = auth('usr', 'pwd')
    const login = {name: '___', pass: 'pwd'}
    assert.strictEqual(check(login), false)
  })

  it('should return false with wrong password', () => {
    const check = auth('usr', 'pwd')
    const login = {name: 'usr', pass: '___'}
    assert.strictEqual(check(login), false)
  })

  it('should return false with wrong credentials', () => {
    const check = auth('usr', 'pwd')
    const login = {name: '___', pass: '___'}
    assert.strictEqual(check(login), false)
  })

  it('should return false when no credentials set', () => {
    const check = auth('usr', 'pwd')
    const login = {}
    assert.strictEqual(check(login), false)
  })

  it('should return false when nothing set', () => {
    const check = auth('usr', 'pwd')
    assert.strictEqual(check(), false)
  })
})
