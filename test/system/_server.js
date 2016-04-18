"use strict";

const express     = require("express");
const router      = require("../../app/http/router");
const server      = express();
const mongodb     = require("mongodb");
const odm         = require("../../app/odm");
const credentials = require("./_credentials");
const runtime     = require("../../app/cli_args");

const db_url = runtime.db(process.argv);

mongodb.connect("mongodb://192.168.99.100:32768").then((db) => {
  const now = new Date();
  const collection = db.collection("shortlinks-system-test-"+now.toISOString());
  const shortlinks = odm(collection);
  router(server, credentials, shortlinks);
  return collection.createIndex({token:1}, {unique:true});
}).then(() => {
  run();
});

module.exports = server;
