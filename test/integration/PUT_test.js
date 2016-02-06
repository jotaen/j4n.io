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

  it("[CONDITION] The shortlink should be available now", (done) => {
    request(server)
      .get(route)
      .expect(200)
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
