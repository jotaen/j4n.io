"use strict";

const Shortlink = require("../shortlink");
const trim_slashes = require("../trim_slashes");
const random_token = require("random-string");

const handle = (res, error) => {
  if (! error) {
    res.status(404).send({});
  } else if (error.name === "ValidationError" || error.name === "CastError") {
    res.status(422).send(error);
  } else {
    res.sendStatus(500);
  }
};

module.exports = (server) => {

  server.get("/", (req, res) => {
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
        handle(res);
      }
    }).catch((error) => {
      handle(res, error);
    });
  });

  server.put("/", (_, res) => {
    res.status(405).header("Allow", "GET, POST").send({});
  });

  server.put("/:token", (req, res) => {
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
        handle(res, error);
      }
    });
  });

  server.post("/", (req, res) => {
    let token = random_token({length: 6});

    const shortlink = new Shortlink({
      url: req.query.url,
      path: token,
      status_code: req.query.status_code
    });

    shortlink.save()
    .then((shortlink) => {
      res.status(201).send(shortlink);
    }).catch((error) => {
      handle(res, error);
    });
  });

  server.post("/:token", (req, res) => {
    let new_data = { // todo: const?
      url: req.query.url,
      updated: Date.now()
    };
    if (req.query.status_code) {
      new_data.status_code = req.query.status_code;
    }
    Shortlink.findOneAndUpdate({
      path: trim_slashes(req.params.token)
    }, new_data, {
      runValidators: true
    }).then((shortlink) => {
      if (shortlink) {
        res.status(200).send({});
      } else {
        handle(res);
      }
    }).catch((error) => {
      handle(res, error);
    });
  });

  server.delete("/:token", (req, res) => {
    Shortlink.findOneAndRemove({
      path: trim_slashes(req.params.token)
    }).then((shortlink) => {
      if (shortlink) {
        res.status(200).send({});
      } else {
        handle(res);
      }
    }).catch((error) => {
      handle(res, error);
    });
  });

};
