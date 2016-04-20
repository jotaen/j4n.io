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
});

module.exports = server;
