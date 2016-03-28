"use strict";

const auth = require("basic-auth");

const match = (credentials, secret) => {
  if (! credentials) {
    return false;
  }
  if (
    credentials.name === secret.username
    && credentials.pass === secret.password
  ) {
    return true;
  }
  return false;
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
