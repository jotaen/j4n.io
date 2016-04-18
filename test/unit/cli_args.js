"use strict";

const assert = require("assert");
const args = require("../../app/cli_args");

describe("cli_args", () => {

  it("should return default port when nothing given", () => {
    const input  = [];
    const expect = 3000;
    const result = args.port(input);
    assert.strictEqual(expect, result);
  });

  it("should return default port when option (but no value) given", () => {
    const input = ["--port"];
    const expect = 3000;
    const result = args.port(input);
    assert.strictEqual(expect, result);
  });

  it("should return default port when value has wrong format", () => {
    const input  = ["--port", "asdf"];
    const expect = 3000;
    const result = args.port(input);
    assert.strictEqual(expect, result);
  });

  it("should return the port as integer when given", () => {
    const input  = ["--port", "1234"];
    const expect = 1234;
    const result = args.port(input);
    assert.strictEqual(expect, result);
  });

  it("should not return the next option name when no value specified", () => {
    const input  = ["--port", "--otherOption"];
    const expect = 3000;
    const result = args.port(input);
    assert.strictEqual(expect, result);
  });

  it("should return verbose mode inactive by default", () => {
    const input  = [];
    const expect = false;
    const result = args.verbose(input);
    assert.strictEqual(expect, result);
  });

  it("should return verbose mode inactive by default", () => {
    const input  = ["--verbose"];
    const expect = true;
    const result = args.verbose(input);
    assert.strictEqual(expect, result);
  });

  it("should return default db host when no option given", () => {
    const input  = [];
    const expect = "mongodb://127.0.0.1";
    const result = args.db(input);
    assert.strictEqual(expect, result);
  });

  it("should return default db host when option (but no value) given", () => {
    const input  = ["--db"];
    const expect = "mongodb://127.0.0.1";
    const result = args.db(input);
    assert.strictEqual(expect, result);
  });

  it("should not return the next option name when no value specified", () => {
    const input  = ["--db", "--otherOption"];
    const expect = "mongodb://127.0.0.1";
    const result = args.db(input);
    assert.strictEqual(expect, result);
  });

  it("should return the db host when given (protocol prepended)", () => {
    const input  = ["--db", "192.168.15.16/foo"];
    const expect = "mongodb://192.168.15.16/foo";
    const result = args.db(input);
    assert.strictEqual(expect, result);
  });

  it("should return the password when given", () => {
    const input  = ["--password", "foobar"];
    const expect = "foobar";
    const result = args.password(input);
    assert.strictEqual(expect, result);
  });

  it("should return default password when no value specified", () => {
    const input  = ["--password"];
    const expect = "a";
    const result = args.password(input);
    assert.strictEqual(expect, result);
  });

  it("should not return the next option name when no value specified", () => {
    const input  = ["--password", "--otherOption"];
    const expect = "a";
    const result = args.password(input);
    assert.strictEqual(expect, result);
  });

});
