"use strict";

const express   = require("express");
const router    = require("../../app/http/router");
const server    = express();
const db        = require("mongoose");
const mock      = require("mockgoose");

after((done) => {
  //  Temporary workaround for avoiding the issue, that
  //  mockgoose doesn’t terminates the mongod background process.
  //  See: https://github.com/mccormicka/Mockgoose/issues/178
  db.connection.db.dropDatabase((error) => {
    if (error) { console.log(error); }
    db.disconnect((error) => {
      if (error) { console.log(error); }
      done();
    });
  });
});

before((done) => {
  mock(db);
  router(server);
  db.connect("mongodb://foo", (error) => {
    if (error) {
      console.log(error);
    }
    done();
  });
});

module.exports = server;
