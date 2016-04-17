"use strict";

const clean = require("./clean");

module.exports = (collection) => {

  const odm = {};

  odm.create = (token, url, status_code) => {
    const now = new Date();
    const doc = {
      token: token,
      url: url,
      status_code: (typeof status_code !== "undefined" ? status_code : 301),
      created: now,
      updated: now
    };

    return new Promise((resolve, reject) => {
      collection.insertOne(doc).then((doc) => {
        resolve(clean.one(doc.ops[0]));
      }).catch(() => {
        reject();
      });
    });
  };

  odm.find = (token) => {
    return new Promise((resolve, reject) => {
      collection.findOne({token: token}).then((doc) => {
        if (! doc) {
          reject(null);
        } else {
          resolve(clean.one(doc));
        }
      }).catch(() => {
        reject();
      });
    });
  };

  odm.list = () => {
    return new Promise((resolve, reject) => {
      collection.find().toArray().then((docs) => {
        resolve(clean.many(docs));
      }).catch(() => {
        reject();
      });
    });
  };

  odm.update = (token, changeset) => {
    changeset.updated = new Date();

    return new Promise((resolve, reject) => {
      collection.findOneAndUpdate({token: token}, {
        $set: changeset
      }, {
        returnOriginal: false
      }, (err, doc) => {
        if (! doc) {
          reject();
          return;
        }
        resolve(clean.one(doc.value));
      });
    });
  };

  odm.delete = (token) => {
    return new Promise((resolve, reject) => {
      collection.findOneAndDelete({token: token}).then((doc) => {
        resolve(clean.one(doc.value));
      }).catch(() => {
        reject();
      });
    });
  };

  return odm;

};
