"use strict";

const valid_uri = require("valid-url").isUri;
const mongoose  = require("mongoose");

const Schema = mongoose.Schema;

module.exports = mongoose.model("Shortlink", new Schema({

  path: {
    type: String,
    minlength: 1,
    required: true,
    index: true,
    unique: true
  },

  url: {
    type: String,
    validate: {
      validator: (v) => {
        return (valid_uri(v) !== undefined);
      },
      message: "{VALUE} is not a valid URI"
    },
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

  redirect_code: {
    type: Number,
    default: 301
  }

}));
