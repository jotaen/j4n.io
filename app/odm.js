"use strict";

module.exports = (collection) => {

  const odm = {};

  odm.create = (token, data) => {
    data.token = token;
    if (! data.status_code) {
      data.status_code = 301;
    }
    const now = new Date();
    data.created = now;
    data.updated = now;
    return new Promise((resolve, reject) => {
      collection.insert(data, (err, doc) => {
        if (err) {
          reject();
        } else {
          delete doc._id;
          resolve(doc);
        }
      });
    });
  };

  odm.find = (token) => {
    return new Promise((resolve, reject) => {
      collection.findOne({token: token}, (err, doc) => {
        if (err) {
          reject();
        } else {
          if (! doc) {
            reject(1);
          } else {
            delete doc._id;
            resolve(doc);
          }
        }
      });
    });
  };

  odm.list = () => {
    return new Promise((resolve, reject) => {
      collection.find({}, (err, docs) => {
        if (err) {
          reject();
        } else {
          resolve(docs);
        }
      });
    });
  }

  odm.update = (token, data) => {
    data.token = token;
    if (! data.status_code) {
      data.status_code = 301;
    }
    const now = new Date();
    data.created = now;
    data.updated = now;
    return new Promise((resolve, reject) => {
      collection.findAndModify(data, (err, doc) => {
        if (err) {
          reject();
        } else {
          delete doc._id;
          resolve(doc);
        }
      });
    });
  };

  odm.delete = (token) => {

  };

  return odm;

}
