"use strict";

const assert = require("assert");
const str = require("../../src/string_utility");

describe("string_utility", () => {

  it("should trim nothing, when there is no leading or trailing slash", () => {
    const input  = "foo";
    const expect = "foo";
    const result = str.trim_slashes(input);
    assert.equal(result, expect);
  });

  it("should trim the leading slash", () => {
    const input  = "/foo";
    const expect = "foo";
    const result = str.trim_slashes(input);
    assert.equal(result, expect);
  });

  it("should trim the trailing slash", () => {
    const input  = "foo/";
    const expect = "foo";
    const result = str.trim_slashes(input);
    assert.equal(result, expect);
  });

  it("should trim all trailing slashes", () => {
    const input  = "foo////";
    const expect = "foo";
    const result = str.trim_slashes(input);
    assert.equal(result, expect);
  });

  it("should leave inner slashes untouched", () => {
    const input  = "foo/baz///bar";
    const expect = "foo/baz///bar";
    const result = str.trim_slashes(input);
    assert.equal(result, expect);
  });

});
