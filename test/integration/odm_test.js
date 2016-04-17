"use strict";

const mongodb = require("mongodb");
const odm     = require("../../app/odm");
let shortlinks = {};

before((done) => {
  mongodb.connect("mongodb://192.168.99.100:32768", function(error, db) {
    const collection = db.collection("shortlinks");
    collection.remove({});
    shortlinks = odm(collection);
    done();
  });
});

describe("ODM integration test", () => {

  it("should be empty initially", (done) => {
    shortlinks.list().then((result) => {
      if (result.length === 0) {
        done();
      }
    });
  });

  it("should create a new document", (done) => {
    shortlinks.create("foo1", {url: "http://google.com"}).then((result) => {
      if (result.token === "foo1" && result.url === "http://google.com") {
        done();
      }
    });
  });

  it("should wait 1 second for the next test", (done) => {
    setTimeout(() => {done();}, 1000);
  });

  it("should update an existing document", (done) => {
    shortlinks.update("foo1", {url: "http://bing.com"}).then((result) => {
      if (result.token === "foo1" && result.url === "http://bing.com") {
        done();
      }
    });
  });

});
