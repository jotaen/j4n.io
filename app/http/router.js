"use strict";

const Shortlink    = require("../shortlink");
const trim_slashes = require("../trim_slashes");
const random_token = require("random-string");
const request      = require("../request");
const validator    = require("./validator");
const protector    = require("./protector");
const auth         = require("../auth");

module.exports = (server, credentials) => {

  const admin = auth(credentials.username, credentials.password);

  server.get("/", protector(admin), (req, res) => {
    Shortlink.find({}).then((shortlinks) => {
      res.status(200).send(shortlinks);
    });
  });

  server.get("/:token", (req, res) => {
    Shortlink.findOne({
      path: trim_slashes(req.params.token)
    }).then((shortlink) => {
      if (shortlink) {
        res.status(shortlink.status_code)
        .header("Location", shortlink.url)
        .send(shortlink);
      } else {
        res.status(404).send({});
      }
    }).catch(() => {
      res.sendStatus(500);
    });
  });

  server.put("/", protector(admin), (_, res) => {
    res.status(405).header("Allow", "GET, POST").send({});
  });

  server.put("/:token", protector(admin), validator(request.shortlink), (req, res) => {
    const shortlink = new Shortlink({
      url: req.query.url,
      path: trim_slashes(req.params.token),
      status_code: req.query.status_code
    });

    shortlink.save().then(() => {
      res.status(201).send(shortlink);
    }).catch((error) => {
      if (error.code===11000) {
        res.status(405).header("Allow", "GET, POST, DELETE").send({});
      } else {
        res.sendStatus(500);
      }
    });
  });

  server.post("/", protector(admin), validator(request.shortlink), (req, res) => {
    let token = random_token({length: 6});

    const shortlink = new Shortlink({
      url: req.query.url,
      path: token,
      status_code: req.query.status_code
    });

    shortlink.save()
    .then((shortlink) => {
      res.status(201).send(shortlink);
    }).catch(() => {
      res.sendStatus(500);
    });
  });

  server.post("/:token", protector(admin), validator(request.shortlink), (req, res) => {
    let new_data = { // todo: const?
      url: req.query.url,
      updated: Date.now()
    };
    if (req.query.status_code) {
      new_data.status_code = req.query.status_code;
    }
    Shortlink.findOneAndUpdate({
      path: trim_slashes(req.params.token)
    }, new_data).then((shortlink) => {
      if (shortlink) {
        res.status(200).send({});
      } else {
        res.status(404).send({});
      }
    }).catch(() => {
      res.sendStatus(500);
    });
  });

  server.delete("/:token", protector(admin), (req, res) => {
    Shortlink.findOneAndRemove({
      path: trim_slashes(req.params.token)
    }).then((shortlink) => {
      if (shortlink) {
        res.status(200).send({});
      } else {
        res.status(404).send({});
      }
    }).catch(() => {
      res.sendStatus(500);
    });
  });

};
