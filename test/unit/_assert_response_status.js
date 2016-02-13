"use strict";

module.exports = (status, done) => {
  return {
    status: (code) => {
      if (code === status) {
        done();
      }
      return {
        send: () => {}
      };
    }
  };
};
