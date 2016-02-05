"use strict";

const request = require("supertest");
const express = require("express");
const router  = require("../src/http_router");
const server  = express();

router(server);

describe("GET", function() {

  it("should redirect to default website on baseroute", function (done) {
    request(server)
      .get("/")
      .expect("Location", "http://jotaen.net")
      .expect(301, done);
  });

  it("should return 404 if shortlink token unknown", function(done) {
    request(server)
      .get("/void")
      .expect(404, done);
  });

});
