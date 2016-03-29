"use strict";

const basic_auth = require("basic-auth");

const match = (login, secret) => {
  if (! login) {
    return false;
  }
  if (
    login.name === secret.username
    && login.pass === secret.password
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

  return (http_request) => {
    const login_attempt = basic_auth(http_request);
    return match(login_attempt, secret);
  };

};
