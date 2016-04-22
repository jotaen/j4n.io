"use strict";

module.exports = (path, redirect_url) => {

  return (req, res, next) => {
    if (req.path == path && req.headers.authorization) {
      next();
    } else {
      res.header("Location", redirect_url).sendStatus(301);
    }
  };

};
