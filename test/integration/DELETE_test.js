"use strict";

const request = require("supertest");
const server  = require("./_server");

describe("DELETE", () => {

  const token = "delete";
  const route = "/" + token;
  const url   = "http://example.org/delete";

  it("should exist a shortlink for this test", (done) => {
    request(server)
      .put(route)
      .query({"url": url})
      .expect(200, done);
  });

  it("should delete the shortlink", (done) => {
    request(server)
      .delete(route)
      .expect(200, done);
  });

  it("the resource must be removed now", (done) => {
    request(server)
      .get(route)
      .expect(404, done);
  });

  it("should return 404 when trying to delete this shortlink again", (done) => {
    request(server)
      .delete(route)
      .expect(404, done);
  });

});
