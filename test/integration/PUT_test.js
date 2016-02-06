"use strict";

const request = require("supertest");
const server  = require("./_server");

describe("PUT", () => {

  const token = "put";
  const route = "/" + token;
  const url   = "http://example.org/put";
  const url_2 = "http://another.url/with?some=parameter&and=a#hastag";

  it("should save a new shortlink", (done) => {
    request(server)
      .put(route)
      .query({"url": url})
      .expect(200, done);
  });

  it("the resource should be able to deliver it afterwards", (done) => {
    request(server)
      .get(route)
      .expect("Location", url)
      .expect(301, done);
  });

  it("should refuse to overwrite this existing resource", (done) => {
    request(server)
      .put(route)
      .query({"url": url_2})
      .expect("Allow", "GET, POST, DELETE")
      .expect(405, done);
  });

});
