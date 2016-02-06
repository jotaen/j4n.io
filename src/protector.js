"use strict";

module.exports = (authorized) => {

  return (req, res, next) => {

    if (req.method != "GET" && !authorized(req)) {
      res.status(401).send({});
    } else {
      next();
    }

  };

};
