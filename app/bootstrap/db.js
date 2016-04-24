"use strict";

const mongodb = require("mongodb");

module.exports = (db_path, collection_name) => {
  return mongodb.connect(db_path).then((db) => {
    const collection = db.collection(collection_name);
    return new Promise((resolve, reject) => {
      collection.createIndex({token:1}, {unique:true}).then(() => {
        resolve(collection);
      }).catch((error) => {
        reject(error);
      });
    });
  });
};
