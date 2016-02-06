"use strict";

module.exports = (authorized) => {

  return (req, res, next) => {

    if (req.method != "GET" && ! authorized(req)) {
      res.status(401).send({});
    } else {
      next();
    }


    // if (req.method === "GET" && authorized(req)) {
    //
    // } else {
    //   if (res.statusCode === 200) {
    //     res.status(301).header("Location", "http://example.org");
    //   } else {
    //     res.status(404).send({});
    //   }
    // }

  };

};
