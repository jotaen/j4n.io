'use strict'

const transform = require('./transform')
const collection = require('./bootstrap/db').collection

exports.create = (token, url, statusCode) => {
  const now = new Date()
  const doc = transform.input({
    token: String(token),
    url: url,
    status_code: (typeof statusCode !== 'undefined' ? parseInt(statusCode) : 301),
    created: now,
    updated: now
  })

  return collection()
    .insertOne(doc)
    .then((doc) => transform.output(doc.ops[0]))
    .catch((error) => {
      if (error.code === 11000) throw new Error('ALREADY_EXISTS')
      else throw error
    })
}

exports.find = (token) => collection()
  .findOne({token: token})
  .then((doc) => {
    if (doc) return transform.output(doc)
  })

exports.list = () => {
  return collection()
    .find()
    .toArray()
    .then((docs) => docs.map(transform.output))
}

exports.update = (token, changeset) => {
  changeset.updated = new Date()
  return collection()
    .findOneAndUpdate({token: token}, {
      $set: transform.input(changeset)
    }, {
      returnOriginal: false
    })
    .then((doc) => {
      if (doc.value) return transform.output(doc.value)
    })
}

exports.delete = (token) => collection()
  .findOneAndDelete({token: token})
  .then((doc) => {
    if (doc.value) return transform.output(doc.value)
  })
