"use strict";

const args = require("../src/cli_args");

describe("cli_args", () => {

  it("should return default port", () => {
    const port1 = args.port([]);
    if (port1 !== 3000) throw new Error();

    const port2 = args.port(["--port"]);
    if (port2 !== 3000) throw new Error();

    const port3 = args.port(["--port", "asdf"]);
    if (port3 !== 3000) throw new Error();
  });

  it("should return the port as integer when given", () => {
    const port = args.port(["--port", "1234"]);
    if (port !== 1234) throw new Error();
  });

  it("should return if verbose mode is active", () => {
    const verbose_off = args.verbose([]);
    if (verbose_off !== false) throw new Error();

    const verbose_on = args.verbose(["--verbose"]);
    if (verbose_on !== true) throw new Error();
  });

  it("should return default db host", () => {
    const host1 = args.db([]);
    if (host1 !== "mongodb://localhost") throw new Error();

    const host2 = args.db(["--db"]);
    if (host2 !== "mongodb://localhost") throw new Error();
  });

  it("should return the db host when given (protocol prepended)", () => {
    const host = args.db(["--db", "192.168.15.16/foo"]);
    if (host !== "mongodb://192.168.15.16/foo") throw new Error();
  });

});
