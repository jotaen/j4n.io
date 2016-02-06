"use strict";

const request = require("supertest");
const server  = require("./_server");

describe("POST", () => {

  const token = "post";
  const route = "/" + token;
  const url   = "http://example.org/post";
  const url_2 = "http://another.url/with?some=parameter&and=a#hastag";

  it("should refuse to create a new resource", (done) => {
    request(server)
      .post(route)
      .query({"url": url})
      .expect(404, done);
  });

  it("PUT must be used instead", (done) => {
    request(server)
      .put(route)
      .query({"url": url})
      .expect(200, done);
  });

  it("should do overwrite instead", (done) => {
    request(server)
      .post(route)
      .query({"url": url_2})
      .expect(200, done);
  });

  it("GET should redirect to the new location", (done) => {
    request(server)
      .get(route)
      .expect("Location", url_2)
      .expect(301, done);
  });

});
