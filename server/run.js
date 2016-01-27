"use strict";

const express   = require("express");
const app       = express();
const logging   = require("morgan");
const Datastore = require("nedb");

const db = new Datastore();

//
//  Middlewares
//
app.use(logging("dev"));

//
//  API Routes
//
app.get("/", (req, res) => {
  res.sendStatus(403);
});

app.get("*", (req, res) => {
  const path = req.params[0].substr(1);
  db.findOne({id: path}, (_, doc) => {
    if (doc && doc.id===path) {
      res.send(doc.url);
      // res.redirect(doc.url)
    } else {
      res.sendStatus(404);
    }
  });
});

app.put("*", (req, res) => {
  const url = req.query.url;
  const path = req.params[0].substr(1);
  db.insert({
    id: path,
    url: url
  }, (_, docs) => {
    if (docs) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  });
});

//
//  Launch App
//
app.listen(3001, () => {
  console.log("Server launched…");
});
