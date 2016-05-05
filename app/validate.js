'use strict'

const Joi = require('joi')

const schema = Joi.object().keys({
  url: Joi.string().uri().required(),
  status_code: Joi.number().min(0).required()
})

module.exports = (data) => {
  return new Promise((resolve, reject) => {
    Joi.validate(data, schema, (error) => {
      if (!error) resolve()
      else reject(error)
    })
  })
}
