"use strict";

exports.one = (doc) => {
  return {
    token: doc.token,
    url: doc.url,
    status_code: doc.status_code,
    created: new Date(doc.created),
    updated: new Date(doc.updated)
  };
};

exports.many = (docs) => {
  if (docs.length === 0) {
    return [];
  }
  return docs.map(exports.one);
};
