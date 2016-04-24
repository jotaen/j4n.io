"use strict";

const express     = require("express");
const router      = require("../../app/http/router");
const server      = express();
const mongodb     = require("mongodb");
const odm         = require("../../app/odm");
const credentials = require("./_credentials");
const config      = require("../../app/config");

mongodb.connect(config.db_url).then((db) => {
  const now = new Date();
  const collection = db.collection("shortlinks-system-test-"+now.toISOString());
  const shortlinks = odm(collection);
  router(server, credentials, shortlinks);
  return collection.createIndex({token:1}, {unique:true});
}).then(() => {
  /* global run */
  run();
}).catch((error) => {
  console.log(error);
  console.log("\n");
  console.log(">>> In order to run this test, you need to have a mongodb and");
  console.log(">>> provide the DB_HOST variable to the test process. E.g.");
  console.log(">>> DB_HOST=localhost:27017 npm test");
});

module.exports = server;
