"use strict";

const Shortlink = require("../src/shortlink");

describe("shortlink schema", function() {

  it("should validate against correct data", function(done) {
    let link = new Shortlink({
      path: "foo",
      url: "http://example.org",
      created: new Date(),
      updated: new Date(),
      redirect_code: 301
    });

    link.validate(function(err) {
      if (!err) done();
    });
  });

  it("should add creation date automatically", function(done) {
    let link = new Shortlink({
      path: "foo",
      url: "http://example.org"
    });

    let now = new Date();
    let diff_ms = now - link.created;
    if (diff_ms > 10) throw new Error();

    done();
  });

  it("should add update date automatically", function(done) {
    let link = new Shortlink({
      path: "foo",
      url: "http://example.org"
    });

    let now = new Date();
    let diff_ms = now - link.updated;
    if (diff_ms > 10) throw new Error();

    done();
  });

  it("should fail if url is not set", function(done) {
    let link = new Shortlink({
      path: "foo"
    });

    link.validate(function(err) {
      if (err) done();
    });
  });

  it("should fail if url is not valid", function(done) {
    let link = new Shortlink({
      path: "foo",
      url: "void"
    });

    link.validate(function(err) {
      if (err) done();
    });
  });

  it("should fail if path is not set", function(done) {
    let link = new Shortlink({
      url: "http://example.org"
    });

    link.validate(function(err) {
      if (err) done();
    });
  });

  it("should fail if path is empty", function(done) {
    let link = new Shortlink({
      path: "",
      url: "http://example.org"
    });

    link.validate(function(err) {
      if (err) done();
    });
  });

});
