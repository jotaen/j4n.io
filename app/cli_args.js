"use strict";

exports.port = (args) => {
  const i = args.indexOf("--port");
  if (i >= 0 && args[i+1]) {
    let port = parseInt(args[i+1]);
    if (port) return port;
  }
  return 3000;
};

exports.verbose = (args) => {
  const i = args.indexOf("--verbose");
  if (i >= 0) {
    return true;
  }
  return false;
};

exports.db = (args) => {
  const i = args.indexOf("--db");
  if (i >= 0 && args[i+1]) {
    return ("mongodb://" + args[i+1]);
  }
  return "mongodb://127.0.0.1";
};
