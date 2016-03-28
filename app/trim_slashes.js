"use strict";

module.exports = (string) => {
  if (string.substr(0,1)==="/") {
    string = string.substr(1);
  }
  string = string.replace(/\/+$/, "");
  return string;
};
