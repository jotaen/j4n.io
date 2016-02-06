"use strict";

const Shortlink = require("./shortlink");
const trim_slashes = require("./trim_slashes");
const random_token = require("random-string");

module.exports = (server) => {

  server.get("/", (req, res) => {
    Shortlink.find({}).then((shortlinks) => {
      res.send(shortlinks);
    });
  });

  server.get("/:token", (req, res) => {
    Shortlink.findOne({
      path: trim_slashes(req.params.token)
    }).then((shortlink) => {
      if (shortlink) {
        res.send(shortlink.url);
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
      res.status(200).send(shortlink);
    })
    .catch((error) => {
      if (error.code===11000) {
        res.status(405).header("Allow", "GET, POST, DELETE").send();
      } else {
        res.sendStatus(500);
      }
    });
  });

  server.post("/", (req, res) => {
    let token = random_token({length: 6});

    const shortlink = new Shortlink({
      url: req.query.url,
      path: token
    });

    shortlink.save()
    .then((shortlink) => {
      res.status(200).send(shortlink);
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
