"use strict";

const request = require("supertest");
const server  = require("./_server");
const validate = require("./_validate");

describe("GET", () => {

  const token = "get";
  const route = "/" + token;

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
      .end(done);
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
