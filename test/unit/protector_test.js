"use strict";

const protector  = require("../../app/http/protector");
const assert_response_status = require("./_assert_response_status");

const not_authorized = () => false;
const authorized     = () => true;

describe("protector middleware", () => {

  it("should allow GET to specific route for unauthorized users", (done) => {
    const req = {
      method: "GET",
      path: "/some_resource"
    };
    protector(not_authorized)(req, {}, done);
  });

  it("should allow POST to base route for authorized users", (done) => {
    const req = {
      method: "POST",
      path: "/"
    };
    protector(authorized)(req, {}, done);
  });

  it("should allow GET to base route for unauthorized users", (done) => {
    const req = {
      method: "GET",
      path: "/some/resource"
    };
    protector(not_authorized)(req, {}, done);
  });

  it("should not allow GET to base route for unauthorized users", (done) => {
    const req = {
      method: "GET",
      path: "/"
    };
    protector(not_authorized)(req, assert_response_status(401, done));
  });

  it("should not allow POST for unauthorized users", (done) => {
    const req = {
      method: "POST",
      path: "/"
    };
    protector(not_authorized)(req, assert_response_status(401, done));
  });

  it("should not allow PUT for unauthorized users", (done) => {
    const req = {
      method: "PUT",
      path: "/"
    };
    protector(not_authorized)(req, assert_response_status(401, done));
  });

  it("should not allow DELETE for unauthorized users", (done) => {
    const req = {
      method: "DELETE",
      path: "/"
    };
    protector(not_authorized)(req, assert_response_status(401, done));
  });

});
