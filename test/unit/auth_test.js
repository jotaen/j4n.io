"use strict";

const assert = require("assert");
const auth   = require("../../app/auth");

describe("auth", () => {

  it("should return true with correct credentials", () => {
    const check   = auth("usr", "pwd");
    const request = {name: "usr", pass: "pwd"};
    assert.strictEqual(check(request), true);
  });

  it("should return false with wrong username", () => {
    const check   = auth("usr", "pwd");
    const request = {name: "___", pass: "pwd"};
    assert.strictEqual(check(request), false);
  });

  it("should return false with wrong password", () => {
    const check   = auth("usr", "pwd");
    const request = {name: "usr", pass: "___"};
    assert.strictEqual(check(request), false);
  });

  it("should return false with wrong credentials", () => {
    const check   = auth("usr", "pwd");
    const request = {name: "___", pass: "___"};
    assert.strictEqual(check(request), false);
  });

  it("should return false when no credentials sent", () => {
    const check  = auth("usr", "pwd");
    const request = {headers: {}};
    assert.strictEqual(check(request), false);
  });

});
