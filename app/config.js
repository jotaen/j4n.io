"use strict";

module.exports = {

  db_url: "mongodb://" + (process.env.DB || "127.0.0.1"),

  port: process.env.PORT || 3000,

  debug: process.env.DEBUG || false,

  password: process.env.PASSWORD || "a"

};
