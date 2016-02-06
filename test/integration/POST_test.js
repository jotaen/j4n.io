"use strict";

const request = require("supertest");
const server  = require("./_server");
const validate = require("./_validate");

describe("POST", () => {

  let token    = ""; // will be set later in the test
  let route    = ""; // will be set later in the test
  let first_id = ""; // will be set later in the test
  const url    = "http://example.org/post";
  const url_2  = "http://another.url/with?some=parameter&and=a#hastag";

  it("should refuse to create a new resource under a given URL", (done) => {
    request(server)
      .post("/some_specific_resource")
      .query({"url": url})
      .expect(404)
      .expect("Content-Type", /json/)
      .end(done);
  });

  it("should create new resources under the baseroute", (done) => {
    request(server)
      .post("/")
      .query({"url": url})
      .expect(201)
      .expect("Content-Type", /json/)
      .expect((res) => {
        token = res.body.path;
        route = "/" + token;
        first_id = res.body._id;
      })
      .end((err, res) => {
        validate(res.body).then(done);
      });
  });

  it("should not create the same token each time", (done) => {
    request(server)
      .post("/")
      .query({"url": url})
      .expect(201)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (res.body._id != first_id) {
          done();
        }
      });
  });

  it("[CONDITION] The new shortlink should be accessible now", (done) => {
    request(server)
      .get(route)
      .expect(200)
      .end(done);
  });

  it("should be able to update an existing shortlink", (done) => {
    request(server)
      .post(route)
      .query({"url": url_2})
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        validate(res.body).then(done);
      });
  });

  it("[CONDITION] The shortlink data should be updated", (done) => {
    request(server)
      .get(route)
      .expect(200)
      .end(done);
  });

});
