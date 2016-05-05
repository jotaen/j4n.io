'use strict'

const transform = require('../transform')

module.exports = () => {
  return (req, res, next) => {
    req.params.token = transform.token(req.params.token)
    if (req.body) req.body = transform.odmInput(req.body)
    next()
  }
}
