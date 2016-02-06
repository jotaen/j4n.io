"use strict";

const request = require("supertest");
const server  = require("./_server");

describe("GET", () => {

  const token = "get";
  const route = "/" + token;

  it("should list all shortlinks on baseroute", (done) => {
    request(server)
      .get("/")
      .expect(200)
      .end((err, res) => {
        if (res.body instanceof Array) {
          done();
        }
      });
  });

  it("should return 404 if a shortlink was not found", (done) => {
    request(server)
      .get(route)
      .expect(404)
      .end(done);
  });

});
