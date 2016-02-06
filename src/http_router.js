"use strict";

const Shortlink = require("./shortlink");
const trim_slashes = require("./string_utility").trim_slashes;

module.exports = (server) => {

  server.get("/", (req, res) => {
    res.redirect(301, "http://jotaen.net");
  });

  server.get("/:token", (req, res) => {
    const path = trim_slashes(req.params.token);
    Shortlink.findOne({
      path: path
    }).then((shortlink) => {
      if (shortlink) {
        res.redirect(301, shortlink.url);
      } else {
        res.sendStatus(404);
      }
    });
  });

  server.put("/:token", (req, res) => {
    const shortlink = new Shortlink({
      url: req.query.url,
      path: trim_slashes(req.params.token)
    });

    shortlink
      .save()
      .then(() => {
        res.sendStatus(200);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });

};
