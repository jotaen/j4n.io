"use strict";

const protector = require("../../src/protector");

const assert_401_response = {
  status: (code) => {
    if (code !== 401) {
      throw new Error();
    }
    return {
      send: () => {}
    };
  }
};

describe("protector middleware", () => {

  it("should always allow GET requests", (done) => {
    const middleware = protector();

    middleware({method: "GET"}, {}, done);
  });

  it("should reject access to all other available routes", () => {
    const middleware = protector();

    middleware({method: "POST", headers: {}}, assert_401_response);
    middleware({method: "PUT", headers: {}}, assert_401_response);
    middleware({method: "DELETE", headers: {}}, assert_401_response);
  });

});
