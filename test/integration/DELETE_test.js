"use strict";

const request = require("supertest");
const server  = require("./_server");

describe("DELETE", () => {

  const token = "delete";
  const route = "/" + token;
  const url   = "http://example.org/delete";

  it("[CONDITION] There should exist a resource for this test", (done) => {
    request(server)
      .put(route)
      .auth("foo", "bar")
      .query({"url": url})
      .expect(201)
      .expect("Content-Type", /json/)
      .end(done);
  });

  it("should delete the resource", (done) => {
    request(server)
      .delete(route)
      .auth("foo", "bar")
      .expect(200)
      .expect("Content-Type", /json/)
      .end(done);
  });

  it("[CONDITION] The resource must be removed now", (done) => {
    request(server)
      .get(route)
      .expect(404)
      .expect("Content-Type", /json/)
      .end(done);
  });

  it("should return 404 when trying to delete this resource again", (done) => {
    request(server)
      .delete(route)
      .auth("foo", "bar")
      .expect(404)
      .expect("Content-Type", /json/)
      .end(done);
  });

});
