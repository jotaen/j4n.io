"use strict";

const mongoose  = require("mongoose");
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

module.exports = mongoose.model("Shortlink", new Schema({

  token: {
    type: String,
    required: true,
    minlength: 1,
    index: true,
    unique: true
  },

  url: {
    type: String,
    required: true
  },

  created: {
    type: Date,
    default: Date.now
  },

  updated: {
    type: Date,
    default: Date.now
  },

  status_code: {
    type: Number,
    default: 301
  }

}));
