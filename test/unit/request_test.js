"use strict";

const Joi = require("joi");
const shortlink_schema = require("../../app/request").shortlink;

const assert_accept = (data, schema, done) => {
  Joi.validate(data, schema, (err) => {
    if (!err) {
      done();
    }
  });
};

const assert_reject = (data, schema, done) => {
  Joi.validate(data, schema, (err) => {
    if (err) {
      done();
    }
  });
};

describe("request_schema", () => {

  it("should accept correct shortlink data", (done) => {
    assert_accept({
      url: "http://google.com",
      status_code: 301
    }, shortlink_schema, done);
  });

  it("should accept correct shortlink data with minimum parameters", (done) => {
    assert_accept({
      url: "http://google.com"
    }, shortlink_schema, done);
  });

  it("should reject incorrect URLs", (done) => {
    assert_reject({
      url: "incorrect_URL"
    }, shortlink_schema, done);
  });

  it("should reject invalid status codes", (done) => {
    assert_reject({
      url: "https://bing.com",
      status_code: "a"
    }, shortlink_schema, done);
  });

});
