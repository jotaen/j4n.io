"use strict";

const assert = require("assert");
const trim_slashes = require("../../src/trim_slashes");

describe("trim_slashes", () => {

  it("should trim nothing, when there is no leading or trailing slash", () => {
    const input  = "foo";
    const expect = "foo";
    const result = trim_slashes(input);
    assert.strictEqual(result, expect);
  });

  it("should trim the leading slash", () => {
    const input  = "/foo";
    const expect = "foo";
    const result = trim_slashes(input);
    assert.strictEqual(result, expect);
  });

  it("should trim the trailing slash", () => {
    const input  = "foo/";
    const expect = "foo";
    const result = trim_slashes(input);
    assert.strictEqual(result, expect);
  });

  it("should trim all trailing slashes", () => {
    const input  = "foo////";
    const expect = "foo";
    const result = trim_slashes(input);
    assert.strictEqual(result, expect);
  });

  it("should leave inner slashes untouched", () => {
    const input  = "foo/baz///bar";
    const expect = "foo/baz///bar";
    const result = trim_slashes(input);
    assert.strictEqual(result, expect);
  });

});
