"use strict";

let express  = require("express");
let app      = express();
let router   = express.Router();
let logging  = require("morgan");
let redirect = require("../src/redirect");

//
//  Middlewares
//
router.use(logging("dev"));

//
//  API Routes
//
router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("*", (req, res) => {
  let path = req.params[0].substr(1);
  let url = redirect(path);
  if (url) {
    res.send("Redirect...");
  } else {
    res.send("Not Found!");
  }
});

//
//  Launch App
//
app.use("/", router);
app.listen(3001);
