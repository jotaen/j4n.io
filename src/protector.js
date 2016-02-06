"use strict";

const auth = require("basic-auth");

const match = (credentials, secret) => {
  if (! credentials) {
    return false;
  }
  if (credentials.name !== secret.name) {
    return false;
  }
  if (credentials.pass !== secret.password) {
    return false;
  }
  return true;
};

module.exports = (name, password) => {

  const secret = {
    name: name,
    password: password
  };

  return (req, res, next) => {
    if (req.method === "GET") {
      next();
      return;
    }

    const credentials = auth(req);

    if (match(credentials, secret)) {
      next();
      return;
    }

    res.status(401).send({});
  };

};
