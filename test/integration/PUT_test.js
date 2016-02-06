"use strict";

const request   = require("supertest");
const server    = require("./_server");
const Shortlink = require("../../src/shortlink");

describe("PUT", () => {

  const token = "put";
  const route = "/" + token;
  const url   = "http://example.org/put";
  const url_2 = "http://another.url/with?some=parameter&and=a#hastag";

  it("should save a new shortlink and return full dataset", (done) => {
    request(server)
      .put(route)
      .query({"url": url})
      .expect(200)
      .end((err, res) => {
        const schema = new Shortlink(res.body);
        schema.validate((validation_error) => {
          if (!validation_error) done();
        });
      });
  });

  it("the resource should be available afterwards", (done) => {
    request(server)
      .get(route)
      .expect(200)
      .end(done);
  });

  it("should refuse to overwrite this existing resource", (done) => {
    request(server)
      .put(route)
      .query({"url": url_2})
      .expect("Allow", "GET, POST, DELETE")
      .expect(405)
      .end(done);
  });

});
