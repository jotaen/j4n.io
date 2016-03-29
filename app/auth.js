"use strict";


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

  return (login) => {
    return match(login, secret);
  };

};
