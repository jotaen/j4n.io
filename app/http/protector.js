"use strict";

const basic_auth = require("basic-auth");

module.exports = (is_authorized) => {

  return (req, res, next) => {
    const login_attempt = basic_auth(req);
    if (is_authorized(login_attempt)) {
      next();
    } else {
      res.status(401).send({});
    }
  };

};
