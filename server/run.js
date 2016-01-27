"use strict";

let express   = require("express");
let app       = express();
let logging   = require("morgan");

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
  let path = req.params[0].substr(1);
  if (path === "asdf") {
    res.sendStatus(301);
  } else {
    res.sendStatus(500);
  }
});

app.post("/", (req, res) => {
  console.log(req.query.id);
  res.sendStatus(200);
});

//
//  Launch App
//
app.listen(3001, () => {
  console.log("Server launched…");
});
