"use strict";

module.exports = (authorized) => {

  return (req, res, next) => {
    if (! authorized(req)) {
      if (req.path == "/" || req.method != "GET") {
        res.status(401).send({});
        return;
      }
    }
    next();
  };

};
