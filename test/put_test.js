const request = require("supertest");
const express = require("express");
const router  = require("../src/http_router")
const server  = express();

router(server);

describe("PUT", function() {

  it("save new shortlink", function (done) {
    request(server)
      .put("/foo")
      .query({"url": "http://example.org/foo"})
      .expect("http://example.org/foo")
      .expect(200, done);
  });

});
