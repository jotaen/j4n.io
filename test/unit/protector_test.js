"use strict";

const protector  = require("../../app/http/protector");
const assert_response_status = require("./_assert_response_status");

const not_authorized = () => false;
const authorized     = () => true;

const auth_request = (method, path, username, password) => {
  const credentials = username + ":" + password;
  const encoded = new Buffer(credentials).toString("base64");
  return {
    method: method,
    path: path,
    headers: {
      authorization: "Basic " + encoded
    }
  };
};

describe("protector middleware", () => {

  it("should allow GET to specific route for unauthorized users", (done) => {
    const req = auth_request("GET", "/some_resource", "user", "pass");
    protector(not_authorized)(req, {}, done);
  });

  it("should allow POST to base route for authorized users", (done) => {
    const req = auth_request("POST", "/", "user", "pass");
    protector(authorized)(req, {}, done);
  });

  it("should allow GET to base route for unauthorized users", (done) => {
    const req = auth_request("GET", "/some/resource", "user", "pass");
    protector(not_authorized)(req, {}, done);
  });

  it("should not allow GET to base route for unauthorized users", (done) => {
    const req = auth_request("GET", "/", "user", "pass");
    protector(not_authorized)(req, assert_response_status(401, done));
  });

  it("should not allow POST for unauthorized users", (done) => {
    const req = auth_request("POST", "/some_resource", "user", "pass");
    protector(not_authorized)(req, assert_response_status(401, done));
  });

  it("should not allow PUT for unauthorized users", (done) => {
    const req = auth_request("PUT", "/", "user", "pass");
    protector(not_authorized)(req, assert_response_status(401, done));
  });

  it("should not allow DELETE for unauthorized users", (done) => {
    const req = auth_request("DELETE", "/some_resource", "user", "pass");
    protector(not_authorized)(req, assert_response_status(401, done));
  });

});
