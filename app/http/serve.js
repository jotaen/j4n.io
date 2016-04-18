"use strict";

/*eslint no-console: 0*/

const express     = require("express");
const router      = require("./router");
const logging     = require("morgan");
const runtime     = require("../cli_args");
const mongodb     = require("mongodb");
const odm         = require("../odm");
const server      = express();

const port        = runtime.port(process.argv);
const verbose     = runtime.verbose(process.argv);
const db_url      = runtime.db(process.argv);
const credentials = {
  username: "admin",
  password: runtime.password(process.argv)
};

if (verbose) {
  console.log("Verbose mode: active");
  server.use(logging("dev"));
}

mongodb.connect(db_url, function(error, db) {
  if (error) {
    console.log(error);
  } else {
    const collection = db.collection("shortlinks");
    const shortlinks = odm(collection);

    router(server, credentials, shortlinks);

    server.listen(port, () => {
      console.log("Server listening on port " + port + "…");
    });
  }
});
