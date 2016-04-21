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

mongodb.connect(config.db_url).then((db) => {
  const collection = db.collection("shortlinks");
  const shortlinks = odm(collection);
  router(server, credentials, shortlinks);
  return collection.createIndex({token:1}, {unique:true});
}).then(() => {
  server.listen(config.port, () => {
    console.log("Server listening on port " + config.port + "…");
  });
}).catch((error) => {
  console.log(error);
});
