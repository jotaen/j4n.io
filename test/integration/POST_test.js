"use strict";

const request = require("supertest");
const server  = require("./_server");

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
      .end(done);
  });

  it("should create new resources under the baseroute", (done) => {
    request(server)
      .post("/")
      .query({"url": url})
      .expect(200)
      .expect((res) => {
        token = res.body.path;
        route = "/" + token;
        first_id = res.body._id;
      })
      .end(done);
  });

  it("should not create the same token each time", (done) => {
    request(server)
      .post("/")
      .query({"url": url})
      .expect(200)
      .end((err, res) => {
        if (res.body._id != first_id) {
          done();
        }
      });
  });

  it("GET should be able to access the new resource", (done) => {
    request(server)
      .get(route)
      .expect("Location", url)
      .expect(301)
      .end(done);
  });

  it("should do overwrite instead", (done) => {
    request(server)
      .post(route)
      .query({"url": url_2})
      .expect(200)
      .end(done);
  });

  it("GET should redirect to the new location", (done) => {
    request(server)
      .get(route)
      .expect("Location", url_2)
      .expect(301)
      .end(done);
  });

});
