"use strict";

const request  = require("supertest");
const server   = require("./_server");
const validate = require("./_validate");

describe("PUT", () => {

  const token = "put";
  const route = "/" + token;
  const url   = "http://example.org/put";
  const url_2 = "http://another.url/with?some=parameter&and=a#hastag";

  it("should save a new shortlink", (done) => {
    request(server)
      .put(route)
      .query({"url": url})
      .expect(201)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        validate(res.body).then(done);
      });
  });

  it("should reject the request, if url parameter invalid", (done) => {
    request(server)
      .put(route)
      .query({"url": "not_a_valid_url"})
      .expect(422)
      .expect("Content-Type", /json/)
      .end(done);
  });

  it("should not be allowed to call on the baseroute", (done) => {
    request(server)
      .put("/")
      .query({"url": "not_a_valid_url"})
      .expect(405)
      .expect("Allow", "GET, POST")
      .expect("Content-Type", /json/)
      .end(done);
  });

  it("[CONDITION] The shortlink should be available now", (done) => {
    request(server)
      .get(route)
      .expect(301)
      .end(done);
  });

  it("should refuse to overwrite this existing resource", (done) => {
    request(server)
      .put(route)
      .query({"url": url_2})
      .expect(405)
      .expect("Allow", "GET, POST, DELETE")
      .expect("Content-Type", /json/)
      .end(done);
  });

});
