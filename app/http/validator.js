'use strict'

const validate = require('../validate')
const handle = require('./errors')

// Middleware, that only lets requests with valid body pass through
module.exports = () => {
  return (req, res, next) => {
    validate(req.body)
      .then(next)
      .catch((error) => {
        handle.badRequest(res, error.details)
      })
  }
}
