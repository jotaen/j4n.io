"use strict";

const Shortlink = require("../../app/shortlink");

module.exports = (data) => {
  const schema = new Shortlink(data);

  return new Promise((resolve, reject) => {
    schema.validate((error) => {
      if (error) reject();
      else resolve();
    });
  });
};
