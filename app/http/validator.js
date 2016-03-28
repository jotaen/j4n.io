"use strict";

const Joi = require("joi");

module.exports = (schema) => {

  return (req, res, next) => {
    Joi.validate(req.query, schema, (err) => {
      if (!err) {
        next();
      } else {
        res.status(422).send({});
      }
    });
  };

};
