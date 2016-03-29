"use strict";

const Shortlink = require("../../app/shortlink");

exports.shortlink = (body) => {
  const schema = new Shortlink(body);

  return new Promise((resolve, reject) => {
    schema.validate((error) => {
      if (error) {
        reject();
      } else {
        resolve();
      }
    });
  });
};

exports.error = (body) => {
  return new Promise((resolve, reject) => {
    if (body.message.substr(0,5) != "Error") {
      reject();
    }
    if (body.code.toString()[0] != 4) {
      reject();
    }
    if (body.errors && ! Array.isArray(body.errors)) {
      reject();
    }
    resolve();
  });
};
