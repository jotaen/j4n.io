"use strict";

const request = require("supertest");
const express = require("express");
const router  = require("../src/http_router");
const server  = express();

const db      = require("mongoose");
const mock    = require("mockgoose");

before(() => {
  mock(db);
  router(server);
  db.connect("mongodb://foo");
});

describe("http_router", () => {

  const token = "foo";
  const route = "/" + token;
  const url   = "http://example.org/foo";

  it("1. GET should redirect to default website on baseroute", (done) => {
    request(server)
      .get("/")
      .expect("Location", "http://jotaen.net")
      .expect(301, done);
  });

  it("2. GET should return 404 if token was not found", (done) => {
    request(server)
      .get(route)
      .expect(404, done);
  });

  it("3. PUT should save a new shortlink", (done) => {
    request(server)
      .put(route)
      .query({"url": url})
      .expect(200, done);
  });

  it("4. GET should be able to deliver it afterwards", (done) => {
    request(server)
      .get(route)
      .expect("Location", url)
      .expect(301, done);
  });

});
