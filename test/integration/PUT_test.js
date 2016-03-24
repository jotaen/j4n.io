"use strict";

const request  = require("supertest");
const server   = require("./_server");
const validate = require("./_validate");

describe("PUT", () => {

  const token = "put";
  const route = "/" + token;
  const code  = 305;
  const url   = "http://example.org/put";
  const url_2 = "http://another.url/with?some=parameter&and=a#hastag";

  it("should accept and create a new resource", (done) => {
    request(server)
      .put(route)
      .query({
        "url": url,
        "status_code": code
      })
      .expect(201)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        validate(res.body).then(done);
      });
  });

  it("GET should deliver the previously created resource", (done) => {
    request(server)
      .get(route)
      .expect(code)
      .expect("Content-Type", /json/)
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

  it("should fail if parameter `url` is not given (since it is required)", (done) => {
    request(server)
      .put(route)
      .query({})
      .expect(422)
      .expect("Content-Type", /json/)
      .end(done);
  });

  it("should reject the request, if parameter `url` is invalid", (done) => {
    request(server)
      .put(route)
      .query({"url": "not_a_valid_url"})
      .expect(422)
      .expect("Content-Type", /json/)
      .end(done);
  });

  it("should reject the request, if parameter `status_code` is invalid", (done) => {
    request(server)
      .put(route)
      .query({
        "url": "http://google.de",
        "status_code": "not_a_valid_status_code"
      })
      .expect(422)
      .expect("Content-Type", /json/)
      .end(done);
  });

  it("should not be allowed to be called on the base URI", (done) => {
    request(server)
      .put("/")
      .query({"url": "not_a_valid_url"})
      .expect(405)
      .expect("Allow", "GET, POST")
      .expect("Content-Type", /json/)
      .end(done);
  });

});
