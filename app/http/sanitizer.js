'use strict'

const transform = require('../transform')

// Middleware, that preprocesses/sanitizes request data
module.exports = () => {
  return (req, res, next) => {
    if (req.params.token) req.params.token = transform.token(req.params.token)
    if (req.body) req.body = transform.apiInput(req.body)
    next()
  }
}
