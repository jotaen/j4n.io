"use strict";

const request  = require("supertest");
const server   = require("./_server");
const validate = require("./_validate");
const admin    = require("./_credentials");

describe("GET /", () => {

  it("should list all shortlinks on base URI", (done) => {
    request(server)
      .get("/")
      .auth(admin.username, admin.password)
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (res.body instanceof Array) {
          validate.shortlink(res.body[0]).then(done);
        }
      });
  });

});
