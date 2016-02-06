"use strict";

const Shortlink = require("./shortlink");
const trim_slashes = require("./trim_slashes");

module.exports = (server) => {

  server.get("/", (req, res) => {
    res.redirect(301, "http://jotaen.net");
  });

  server.get("/:token", (req, res) => {
    Shortlink.findOne({
      path: trim_slashes(req.params.token)
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

    shortlink.save()
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      if (error.code===11000) {
        res.status(405).header("Allow", "GET, POST, DELETE").send();
      } else {
        res.sendStatus(500);
      }
    });
  });

  server.post("/:token", (req, res) => {
    Shortlink.findOneAndUpdate({
      path: trim_slashes(req.params.token)
    }, {
      url: req.query.url
    }).then((shortlink) => {
      if (shortlink) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    });
  });

  server.delete("/:token", (req, res) => {
    Shortlink.findOneAndRemove({
      path: trim_slashes(req.params.token)
    }).then((shortlink) => {
      if (shortlink) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    });
  });

};
