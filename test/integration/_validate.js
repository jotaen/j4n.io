"use strict";

const Shortlink = require("../../src/shortlink");

module.exports = (express_response) => {
  const schema = new Shortlink(express_response.body);

  return new Promise((resolve, reject) => {
    schema.validate((error) => {
      if (error) reject();
      else resolve();
    });
  });
};
