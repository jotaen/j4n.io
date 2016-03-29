"use strict";

const request  = require("supertest");
const server   = require("./_server");
const admin    = require("./_credentials");

describe("validation", () => {

  const route = "/asdfqwer";

  it("PUT should fail if parameter `url` is not given (since it is required)", (done) => {
    request(server)
      .put(route)
      .auth(admin.username, admin.password)
      .query({})
      .expect(422)
      .expect("Content-Type", /json/)
      .end(done);
  });

  it("PUT should reject the request, if parameter `url` is invalid", (done) => {
    request(server)
      .put(route)
      .auth(admin.username, admin.password)
      .query({"url": "not_a_valid_url"})
      .expect(422)
      .expect("Content-Type", /json/)
      .end(done);
  });

  it("PUT should reject the request, if parameter `status_code` is invalid", (done) => {
    request(server)
      .put(route)
      .auth(admin.username, admin.password)
      .query({
        "url": "http://google.de",
        "status_code": "not_a_valid_status_code"
      })
      .expect(422)
      .expect("Content-Type", /json/)
      .end(done);
  });

  it("PUT should not be allowed to be called on the base URI", (done) => {
    request(server)
      .put("/")
      .auth(admin.username, admin.password)
      .query({"url": "not_a_valid_url"})
      .expect(405)
      .expect("Allow", "GET, POST")
      .expect("Content-Type", /json/)
      .end(done);
  });

  it("POST should reject the request for a specific URI, if parameter `url` is invalid", (done) => {
    request(server)
      .post(route)
      .auth(admin.username, admin.password)
      .query({"url": "not_a_valid_url"})
      .expect(422)
      .expect("Content-Type", /json/)
      .end(done);
  });

  it("POST should reject the request, if parameter `status_code` is invalid", (done) => {
    request(server)
      .post(route)
      .auth(admin.username, admin.password)
      .query({
        "url": "http://google.de",
        "status_code": "not_a_valid_status_code"
      })
      .expect(422)
      .expect("Content-Type", /json/)
      .end(done);
  });

  it("POST should reject the request for base URI, if parameter `url` is invalid", (done) => {
    request(server)
      .post("/")
      .auth(admin.username, admin.password)
      .query({"url": "not_a_valid_url"})
      .expect(422)
      .expect("Content-Type", /json/)
      .end(done);
  });

  it("POST should reject the request for base URI, if parameter `url` is not given", (done) => {
    request(server)
      .post("/")
      .auth(admin.username, admin.password)
      .query({})
      .expect(422)
      .expect("Content-Type", /json/)
      .end(done);
  });

});
