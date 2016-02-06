"use strict";

const express = require("express");
const router  = require("../../src/http_router");
const server  = express();

const db      = require("mongoose");
const mock    = require("mockgoose");

before(() => {
  mock(db);
  router(server);
  db.connect("mongodb://foo");
});

module.exports = server;
