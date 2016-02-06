"use strict";

const request = require("supertest");
const server  = require("./_server");

describe("GET", () => {

  const base  = "http://jotaen.net";
  const token = "get";
  const route = "/" + token;

  it("should redirect to default website on baseroute", (done) => {
    request(server)
      .get("/")
      .expect("Location", base)
      .expect(301, done);
  });

  it("should return 404 if a token was not found", (done) => {
    request(server)
      .get(route)
      .expect(404, done);
  });

});
