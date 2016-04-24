"use strict";

module.exports = {

  db_url: "mongodb://" + (process.env.DB_USER&&process.env.DB_PASSWORD ? process.env.DB_USER+":"+process.env.DB_PASSWORD+"@" : "") + (process.env.DB_HOST || "127.0.0.1"),

  port: process.env.PORT || 3000,

  debug: process.env.DEBUG || false,

  password: process.env.API_PASSWORD || "a"

};
