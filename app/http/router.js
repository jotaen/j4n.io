"use strict";

const Shortlink    = require("../shortlink");
const trim_slashes = require("../trim_slashes");
const random_token = require("randomstring");
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
      token: trim_slashes(req.params.token)
    }).then((shortlink) => {
      if (shortlink) {
        res.status(shortlink.status_code)
        .header("Location", shortlink.url)
        .send(shortlink);
      } else {
        res.status(404).send({
          message: "Error - resource not found",
          code: 404
        });
      }
    }).catch(() => {
      res.sendStatus(500);
    });
  });

  server.put("/", protector(admin), (_, res) => {
    res.status(405).header("Allow", "GET, POST").send({
      message: "Error - PUT is not allowed on the base route",
      code: 405
    });
  });

  server.put("/:token", protector(admin), validator(request.shortlink), (req, res) => {
    const shortlink = new Shortlink({
      url: req.query.url,
      token: trim_slashes(req.params.token),
      status_code: req.query.status_code
    });

    shortlink.save().then(() => {
      res.status(201).send(shortlink);
    }).catch((error) => {
      if (error.code===11000) {
        // 11000 means, that the token already exists. In this case, PUT is not allowed.
        res.status(405).header("Allow", "GET, POST, DELETE").send({
          message: "Error - PUT is not allowed on existing resources",
          code: 405
        });
      } else {
        res.sendStatus(500);
      }
    });
  });

  server.post("/", protector(admin), validator(request.shortlink), (req, res) => {
    let token = random_token.generate({
      charset: "alphanumeric",
      length: 6
    });

    const shortlink = new Shortlink({
      url: req.query.url,
      token: token,
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
    const new_data = {
      url: req.query.url,
      updated: Date.now()
    };
    if (req.query.status_code) {
      new_data.status_code = req.query.status_code;
    }
    Shortlink.findOneAndUpdate({
      token: trim_slashes(req.params.token)
    }, new_data).then((shortlink) => {
      if (shortlink) {
        res.status(200).send(shortlink);
      } else {
        res.status(404).send({
          message: "Error - resource not found",
          code: 404
        });
      }
    }).catch(() => {
      res.sendStatus(500);
    });
  });

  server.delete("/:token", protector(admin), (req, res) => {
    Shortlink.findOneAndRemove({
      token: trim_slashes(req.params.token)
    }).then((shortlink) => {
      if (shortlink) {
        res.status(200).send(shortlink);
      } else {
        res.status(404).send({
          message: "Error - resource not found",
          code: 404
        });
      }
    }).catch(() => {
      res.sendStatus(500);
    });
  });

};
