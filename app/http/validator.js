'use strict'

const Joi = require('joi')
const handle = require('./errors')

module.exports = (schema) => {
  return (req, res, next) => {
    Joi.validate(req.body, schema, (error) => {
      if (error) handle.badRequest(res, error.details)
      else next()
    })
  }
}
