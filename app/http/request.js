'use strict'

const Joi = require('joi')

exports.shortlink = Joi.object().keys({

  url: Joi.string().uri().required(),

  status_code: Joi.number().min(0)

})
