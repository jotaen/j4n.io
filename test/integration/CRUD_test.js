"use strict";

const request  = require("supertest");
const server   = require("./_server");
const validate = require("./_validate");
const admin    = require("./_credentials");

describe("CRUD operations", () => {

  const route     = "/foobaz";
  const code      = 302;
  const url       = "https://foo.baz/myroute?param=1#hash";
  let first_token = ""; // will be set later in the test

  it("GET should return 404 if a resource was not found", (done) => {
    request(server)
      .get(route)
      .expect(404)
      .expect("Content-Type", /json/)
      .end(done);
  });

  it("PUT should accept and create a new resource", (done) => {
    request(server)
      .put(route)
      .auth(admin.username, admin.password)
      .query({
        "url": "http://example.org/asdf",
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

  it("GET should send response in correct format, when a specific URI is requested", (done) => {
    request(server)
      .get(route)
      .expect(301)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        validate(res.body).then(done);
      });
  });

  it("PUT should refuse to overwrite this existing resource", (done) => {
    request(server)
      .put(route)
      .auth(admin.username, admin.password)
      .query({"url": "http://example.org/qwer"})
      .expect(405)
      .expect("Allow", "GET, POST, DELETE")
      .expect("Content-Type", /json/)
      .end(done);
  });

  it("POST should update the existing resource", (done) => {
    request(server)
      .post(route)
      .auth(admin.username, admin.password)
      .query({"url": url})
      .expect(200)
      .expect("Content-Type", /json/)
      .end(done);
  });

  it("GET should return the updated resource", (done) => {
    request(server)
      .get(route)
      .expect(301)
      .end((err, res) => {
        if (res.body.url == url) {
          done();
        }
      });
  });

  it("DELETE should delete the resource", (done) => {
    request(server)
      .delete(route)
      .auth(admin.username, admin.password)
      .expect(200)
      .expect("Content-Type", /json/)
      .end(done);
  });

  it("GET should return a 404 now", (done) => {
    request(server)
      .get(route)
      .expect(404)
      .expect("Content-Type", /json/)
      .end(done);
  });

  it("DELETE should return 404 when trying to delete this resource again", (done) => {
    request(server)
      .delete(route)
      .auth(admin.username, admin.password)
      .expect(404)
      .expect("Content-Type", /json/)
      .end(done);
  });

  it("POST should create new resources under the base URI with random token", (done) => {
    request(server)
      .post("/")
      .auth(admin.username, admin.password)
      .query({"url": url})
      .expect(201)
      .expect("Content-Type", /json/)
      .expect((res) => {
        first_token = res.body.path;
      })
      .end((err, res) => {
        validate(res.body).then(done);
      });
  });

  it("POST should not recreate a resource (i.e. it should return a different URI each time)", (done) => {
    request(server)
      .post("/")
      .auth(admin.username, admin.password)
      .query({"url": url})
      .expect(201)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (res.body.path != first_token) {
          done();
        }
      });
  });

  it("GET should return the new resource", (done) => {
    request(server)
      .get("/" + first_token)
      .expect(301)
      .end(done);
  });

});
