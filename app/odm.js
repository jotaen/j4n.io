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
      collection.insertOne(doc).then((doc) => {
        const result = doc.ops[0];
        delete result._id;
        resolve(result);
      }).catch((error) => {
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
          resolve(doc);
        }
      }).catch((error) => {
        reject(error);
      });
    });
  };

  odm.list = () => {
    return new Promise((resolve, reject) => {
      collection.find().toArray().then((docs) => {
        resolve(docs);
      }).catch((error) => {
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
        const result = doc.value;
        delete result._id;
        resolve(result);
      });
    });
  };

  odm.delete = (token) => {
    return new Promise((resolve, reject) => {
      collection.findOneAndDelete({token: token}).then((doc) => {
        const result = doc.value;
        delete result._id;
        resolve(result);
      }).catch((error) => {
        reject();
      });
    });
  };

  return odm;

};
