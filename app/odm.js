"use strict";

module.exports = (collection) => {

  const odm = {};

  odm.create = (token, data) => {
    const now = new Date();
    const doc = {
      token: token,
      url: data.url,
      status_code: (typeof data.status_code !== 'undefined' ? data.status_code : 301),
      created: now,
      updated: now
    };

    return new Promise((resolve, reject) => {
      collection.insertOne(doc, (err, doc) => {
        if (err) {
          reject();
        } else {
          const result = doc.ops[0];
          delete result._id;
          resolve(result);
        }
      });
    });
  };

  odm.find = (token) => {
    return new Promise((resolve, reject) => {
      collection.findOne({token: token}, (error, doc) => {
        if (error) {
          reject(error);
        } else {
          if (! doc) {
            reject(null);
          } else {
            resolve(doc);
          }
        }
      });
    });
  };

  odm.list = () => {
    return new Promise((resolve, reject) => {
      collection.find().toArray((err, docs) => {
        if (err) {
          reject();
        } else {
          resolve(docs);
        }
      });
    });
  }

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
        const result = doc.value;
        delete result._id;
        resolve(result);
      });
    });
  };

  odm.delete = (token) => {
    return new Promise((resolve, reject) => {
      collection.remove({token: token}, (err, result) => {
        if (err) {
          reject("Database error");
          return;
        }
        if (result.ok == 0 && result.n == 1) {
          resolve(doc);
          return;
        }

        reject();
      });
    });
  };

  return odm;

};
