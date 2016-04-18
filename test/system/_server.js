"use strict";

const express     = require("express");
const router      = require("../../app/http/router");
const server      = express();
const mongojs     = require("mongojs");
const odm         = require("../../app/odm");
const credentials = require("./_credentials");

before((done) => {
  const db = mongojs("mongodb://192.168.99.100:32768");
  const collection = db.collection("shortlinks");
  collection.remove({});
  const shortlinks = odm(collection);
  router(server, credentials, shortlinks);
  done();
});

module.exports = server;
