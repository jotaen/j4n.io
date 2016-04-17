"use strict";

/*eslint no-console: 0*/

const express     = require("express");
const router      = require("./router");
const logging     = require("morgan");
const runtime     = require("../cli_args");
const mongojs     = require("mongojs");
const odm         = require("../odm");

const server      = express();

const port        = runtime.port(process.argv);
const verbose     = runtime.verbose(process.argv);
const db_host     = runtime.db(process.argv);
const credentials = {
  username: process.env.USERNAME,
  password: process.env.PASSWORD
};

const db = mongojs(db_host);
const collection = db.collection('shortlinks');
const shortlinks = odm(collection);

if (verbose) {
  console.log("Verbose mode: active");
  server.use(logging("dev"));
}

router(server, credentials, shortlinks);

server.listen(port, () => {
  console.log("Server listening on port " + port + "…");
});
