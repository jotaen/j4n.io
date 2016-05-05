'use strict'

const validate = require('../validate')
const handle = require('./errors')

module.exports = () => {
  return (req, res, next) => {
    validate(req.body)
      .then(next)
      .catch((error) => {
        handle.badRequest(res, error.details)
      })
  }
}
