"use strict";

const request = require("supertest");
const server  = require("./_server");
const validate = require("./_validate");

describe("DELETE", () => {

  const token = "delete";
  const route = "/" + token;
  const url   = "http://example.org/delete";

  it("[CONDITION] There should exist a shortlink for this test", (done) => {
    request(server)
      .put(route)
      .query({"url": url})
      .expect(200)
      .end(done);
  });

  it("should delete the shortlink", (done) => {
    request(server)
      .delete(route)
      .expect(200)
      .end((err, res) => {
        validate(res).then(done);
      });
  });

  it("[CONDITION] The shortlink must be removed now", (done) => {
    request(server)
      .get(route)
      .expect(404)
      .end(done);
  });

  it("should return 404 when trying to delete this shortlink again", (done) => {
    request(server)
      .delete(route)
      .expect(404)
      .end(done);
  });

});
