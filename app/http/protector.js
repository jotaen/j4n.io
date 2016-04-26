'use strict'

const basicAuth = require('basic-auth')

module.exports = (isAuthorized) => {
  return (req, res, next) => {
    const loginAttempt = basicAuth(req)
    if (isAuthorized(loginAttempt)) {
      next()
    } else {
      res.status(401).send({
        message: 'Error – you are not authorized',
        code: 401
      })
    }
  }
}
