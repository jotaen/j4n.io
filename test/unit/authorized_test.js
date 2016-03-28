"use strict";

const assert        = require("assert");
const authorized    = require("../../app/authorized");

const auth_request = (username, password) => {
  const credentials = username + ":" + password;
  const encoded = new Buffer(credentials).toString("base64");
  return {
    headers: {
      authorization: "Basic " + encoded
    }
  };
};

describe("authorized", () => {

  it("should return true with correct credentials", () => {
    const check   =   authorized("usr", "pwd");
    const request = auth_request("usr", "pwd");
    assert.strictEqual(check(request), true);
  });

  it("should return false with wrong username", () => {
    const check   =   authorized("usr", "pwd");
    const request = auth_request("___", "pwd");
    assert.strictEqual(check(request), false);
  });

  it("should return false with wrong password", () => {
    const check   =   authorized("usr", "pwd");
    const request = auth_request("usr", "___");
    assert.strictEqual(check(request), false);
  });

  it("should return false with wrong credentials", () => {
    const check   =   authorized("usr", "pwd");
    const request = auth_request("___", "___");
    assert.strictEqual(check(request), false);
  });

  it("should return false when no credentials sent", () => {
    const check  =   authorized("usr", "pwd");
    const request = {headers: {}};
    assert.strictEqual(check(request), false);
  });

});
