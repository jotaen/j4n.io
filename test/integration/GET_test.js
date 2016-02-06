"use strict";

const request = require("supertest");
const server  = require("./_server");
const validate = require("./_validate");

describe("GET", () => {

  const token = "get";
  const route = "/" + token;
  let route_2 = ""; // will be set later in the test

  it("should return 404 if a shortlink was not found", (done) => {
    request(server)
      .get(route)
      .expect(404)
      .expect("Content-Type", /json/)
      .end(done);
  });

  it("[PRECONDITION] Some shortlink should be existing", (done) => {
    request(server)
      .post("/")
      .query({"url": "http://foo.bar"})
      .expect(201)
      .expect((res) => {
        route_2 = "/" + res.body.path;
      })
      .end(done);
  });

  it("should send correct headers, if called separately", (done) => {
    request(server)
      .get(route_2)
      .expect(301)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        validate(res.body).then(done);
      });
  });

  it("should list all shortlinks on baseroute", (done) => {
    request(server)
      .get("/")
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (res.body instanceof Array) {
          validate(res.body[0]).then(done);
        }
      });
  });

});
