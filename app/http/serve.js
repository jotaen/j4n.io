"use strict";

/*eslint no-console: 0*/

const express     = require("express");
const router      = require("./router");
const logging     = require("morgan");
const runtime     = require("../cli_args");
const db          = require("mongoose");

const server      = express();

const port        = runtime.port(process.argv);
const verbose     = runtime.verbose(process.argv);
const db_host     = runtime.db(process.argv);
const credentials = {
  username: process.env.USERNAME,
  password: process.env.PASSWORD
};

db.connect(db_host);

if (verbose) {
  console.log("Verbose mode: active");
  server.use(logging("dev"));
}

router(server, credentials);

server.listen(port, () => {
  console.log("Server listening on port " + port + "…");
});
