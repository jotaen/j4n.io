"use strict";

const trim_slashes = require("../trim_slashes");
const random_token = require("randomstring");
const request      = require("./request");
const validator    = require("./validator");
const protector    = require("./protector");
const auth         = require("../auth");

module.exports = (server, credentials, shortlinks) => {

  const admin = auth(credentials.username, credentials.password);

  server.get("/", protector(admin), (req, res) => {
    shortlinks.list().then((result) => {
      res.status(200).send(result);
    });
  });

  server.get("/:token", (req, res) => {
    const token = trim_slashes(req.params.token);
    shortlinks.find(token).then((data) => {
      res.status(data.status_code)
      .header("Location", data.url)
      .send(data.url);
    }).catch((error) => {
      if (error == 1) {
        res.status(404).send({
          message: "Error - resource not found",
          code: 404
        });
      } else {
        res.sendStatus(500);
      }
    });
  });

  server.put("/", protector(admin), (_, res) => {
    res.status(405).header("Allow", "GET, POST").send({
      message: "Error - PUT is not allowed on the base route",
      code: 405
    });
  });

  server.put("/:token", protector(admin), validator(request.shortlink), (req, res) => {
    const data = {
      url: req.query.url,
      status_code: req.query.status_code
    };

    shortlinks.create(token, data)
    .then((shortlink) => {
      res.status(201).send(shortlink);
    }).catch(() => {
      res.sendStatus(500);
    });
  });

  server.post("/", protector(admin), validator(request.shortlink), (req, res) => {
    let token = random_token.generate({
      charset: "alphanumeric",
      length: 6
    });

    const data = {
      url: req.query.url,
      status_code: req.query.status_code
    };

    shortlinks.create(token, data)
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
