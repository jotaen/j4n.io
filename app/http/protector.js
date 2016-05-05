'use strict'

const basicAuth = require('basic-auth')
const handle = require('./errors')

// Middleware, that protects the route with basic auth
module.exports = (secretUsername, secretPassword) => {
  return (req, res, next) => {
    const loginAttempt = basicAuth(req) || {name: undefined, pass: undefined}
    if (secretUsername === loginAttempt.name && secretPassword === loginAttempt.pass) {
      next()
    } else {
      handle.unauthorized(res)
    }
  }
}
