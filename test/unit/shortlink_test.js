"use strict";

const Shortlink = require("../../app/shortlink");

describe("shortlink schema", () => {

  it("should validate against correct data", (done) => {
    let link = new Shortlink({
      path: "foo",
      url: "http://example.org",
      created: new Date(),
      updated: new Date(),
      status_code: 301
    });

    link.validate((err) => {
      if (!err) done();
    });
  });

  it("should add creation date automatically", (done) => {
    let link = new Shortlink({
      path: "foo",
      url: "http://example.org"
    });

    let now = new Date();
    let diff_ms = now - link.created;
    if (diff_ms > 10) throw new Error();

    done();
  });

  it("should add update date automatically", (done) => {
    let link = new Shortlink({
      path: "foo",
      url: "http://example.org"
    });

    let now = new Date();
    let diff_ms = now - link.updated;
    if (diff_ms > 10) throw new Error();

    done();
  });

  it("should fail if url is not set", (done) => {
    let link = new Shortlink({
      path: "foo"
    });

    link.validate((err) => {
      if (err) done();
    });
  });

  it("should fail if url is not valid", (done) => {
    let link = new Shortlink({
      path: "foo",
      url: "void"
    });

    link.validate((err) => {
      if (err) done();
    });
  });

  it("should fail if path is not set", (done) => {
    let link = new Shortlink({
      url: "http://example.org"
    });

    link.validate((err) => {
      if (err) done();
    });
  });

  it("should fail if path is empty", (done) => {
    let link = new Shortlink({
      path: "",
      url: "http://example.org"
    });

    link.validate((err) => {
      if (err) done();
    });
  });

});
