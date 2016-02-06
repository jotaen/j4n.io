"use strict";

/*eslint no-console: 0*/

const express    = require("express");
const router     = require("./src/http_router");
const logging    = require("morgan");
const protector  = require("./src/protector");
const authorized = require("./src/authorized");
const runtime    = require("./src/cli_args");
const db         = require("mongoose");

const server     = express();

const port       = runtime.port(process.argv);
const verbose    = runtime.verbose(process.argv);
const db_host    = runtime.db(process.argv);
const user       = process.env.PROTECTOR_USER;
const password   = process.env.PROTECTOR_PASSWORD;

db.connect(db_host);

if (verbose) {
  console.log("Verbose mode: active");
  server.use(logging("dev"));
}

const admin = authorized(user, password);
server.use(protector(admin));

router(server);

server.listen(port, () => {
  console.log("Server listening on port " + port + "…");
});
