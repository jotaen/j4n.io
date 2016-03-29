"use strict";

const Joi = require("joi");

module.exports = (schema) => {

  return (req, res, next) => {
    Joi.validate(req.query, schema, (error) => {
      if (!error) {
        next();
      } else {
        res.status(422).send({
          message: "Error – the parameters of your request could not be validated.",
          code: 422,
          errors: error.details
        });
      }
    });
  };

};
