"use strict";

module.exports = function(server) {

  server.get("/", (req, res) => {
    res.redirect(301, "http://jotaen.net");
  });

  server.get("*", (req, res) => {
    const path = req.params[0].substr(1);
    res.sendStatus(404);
  });

  server.put("*", (req, res) => {
    const url = req.query.url;
    const path = req.params[0].substr(1);
    res.send(url);
  });

}
