"use strict";

const assert = require("assert");
const schema = require("../../app/schema");

const validate = (data) => {
  const iso8601 = /^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))$/;
  assert(typeof data.token === "string");
  assert(typeof data.url === "string");
  assert(typeof data.status_code === "number");
  assert(typeof data.created === "string");
  assert(typeof data.updated === "string");
  assert(iso8601.test(data.created));
  assert(iso8601.test(data.updated));
};

describe("schema", () => {

  it("should leave correct data untouched", () => {
    const result = schema.input({
      token: "asdf",
      url: "http://googe.de",
      status_code: 302,
      created: new Date(),
      updated: new Date()
    });

    validate(result);
  });

  it("should cast the types into the desired format", () => {
    const result = schema.input({
      token: 12345,
      url: "http://googe.de",
      status_code: "302",
      created: new Date(),
      updated: new Date()
    });

    validate(result);
  });

  it("should liberate the data from unknown properties", () => {
    const result = schema.input({
      token: "asdf",
      foo: "bar",
      url: "http://googe.de",
      status_code: 302,
      created: new Date(),
      updated: new Date(),
      lalala: "hooray!!!"
    });

    validate(result);
    assert(Object.keys(result).length === 5);
  });

  it("should not expect the presence of any property", () => {
    const result = schema.input({});
    assert(Object.keys(result).length === 0);
  });

  it("should remove the mongo-id on output", () => {
    const result = schema.output({
      _id: "a6028bc9b87a6816aa8dc069c7e901b3",
      token: "asdf",
      url: "http://googe.de",
      status_code: 302,
      created: "2011-03-17T12:00:00.182Z",
      updated: "2011-03-17T12:00:00.182Z"
    });
    validate(result);
    assert(Object.keys(result).length === 5);
  });

});
