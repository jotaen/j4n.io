"use strict";

const auth = require("basic-auth");

const match = (credentials, secret) => {
  if (! credentials) {
    return false;
  }
  if (credentials.name !== secret.username) {
    return false;
  }
  if (credentials.pass !== secret.password) {
    return false;
  }
  return true;
};

module.exports = (username, password) => {

  const secret = {
    username: username,
    password: password
  };

  return (req) => {
    const credentials = auth(req);
    return match(credentials, secret);
  };

};
