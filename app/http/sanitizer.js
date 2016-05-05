'use strict'

const transform = require('../transform')

module.exports = () => {
  return (req, res, next) => {
    if (req.params.token) req.params.token = transform.token(req.params.token)
    next()
  }
}
