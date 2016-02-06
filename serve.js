"use strict";

/*eslint no-console: 0*/

const logging = require("morgan");
const express = require("express");
const router  = require("./src/http_router");
const args    = require("./src/cli_args");
const db      = require("mongoose");

const server  = express();
const port    = args.port(process.argv);
const verbose = args.verbose(process.argv);
const db_host = args.db(process.argv);

db.connect(db_host);

if (verbose) {
  console.log("Verbose mode: active");
  server.use(logging("dev"));
}

router(server);

server.listen(port, () => {
  console.log("Server listening on port " + port + "…");
});
