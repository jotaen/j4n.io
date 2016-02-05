"use strict";

/*eslint no-console: 0*/

const logging = require("morgan");
const express = require("express");
const router  = require("./src/http_router");
const server  = express();

const port = ((args) => {
  const i = args.indexOf("--port");
  if (i >= 0) {
    if (args[i+1]) {
      return args[i+1];
    }
  }
  return 3000;
})(process.argv);

const verbose = ((args) => {
  const i = args.indexOf("--verbose");
  if (i >= 0) {
    return true;
  }
  return false;
})(process.argv);

if (verbose) {
  console.log("Verbose mode: active");
  server.use(logging("dev"));
}

router(server);

server.listen(port, () => {
  console.log("Server listening on port "+port+"…");
});
