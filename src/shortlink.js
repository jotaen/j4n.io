"use strict";

const valid_uri = require("valid-url").isUri;
const mongoose  = require("mongoose");
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

module.exports = mongoose.model("Shortlink", new Schema({

  path: {
    type: String,
    required: true,
    minlength: 1,
    index: true,
    unique: true
  },

  url: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return (valid_uri(v) !== undefined);
      },
      message: "{VALUE} is not a valid URI"
    }
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
