"use strict";

module.exports = function(server) {

  server.get("/", (req, res) => {
    res.sendStatus(403);
  });

  server.get("*", (req, res) => {
    const path = req.params[0].substr(1);
    res.send("get*");
  });

  server.put("*", (req, res) => {
    const url = req.query.url;
    const path = req.params[0].substr(1);
    res.send("put*");
  });

}
