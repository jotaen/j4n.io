"use strict";

/*eslint no-console: 0*/

const express     = require("express");
const router      = require("./http/router");
const logging     = require("morgan");
const mongodb     = require("mongodb");
const odm         = require("./odm");
const server      = express();
const config      = require("./config");

const credentials = {
  username: "admin",
  password: config.password
};

if (config.debug) {
  console.log("Debug mode active");
  server.use(logging("dev"));
}

mongodb.connect(config.db_url, function(error, db) {
  if (error) {
    console.log(error);
  } else {
    const collection = db.collection("shortlinks");
    const shortlinks = odm(collection);

    router(server, credentials, shortlinks);

    server.listen(config.port, () => {
      console.log("Server listening on port " + config.port + "…");
    });
  }
});
