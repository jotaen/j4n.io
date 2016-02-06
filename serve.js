"use strict";

/*eslint no-console: 0*/

const express   = require("express");
const router    = require("./src/http_router");
const logging   = require("morgan");
const protector = require("./src/protector");
const runtime   = require("./src/runtime");
const db        = require("mongoose");

const server    = express();

const port      = runtime.port(process.argv);
const verbose   = runtime.verbose(process.argv);
const db_host   = runtime.db(process.argv);
const user      = runtime.user(process.env);
const password  = runtime.password(process.env);

db.connect(db_host);

if (verbose) {
  console.log("Verbose mode: active");
  server.use(logging("dev"));
}

server.use(protector(user, password));

router(server);

server.listen(port, () => {
  console.log("Server listening on port " + port + "…");
});
