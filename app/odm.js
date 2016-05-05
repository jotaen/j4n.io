'use strict'

const collection = require('./bootstrap/db').collection

exports.create = (token, url, statusCode) => {
  const now = new Date()
  const newDoc = {
    token: token,
    url: url,
    status_code: statusCode,
    created: now,
    updated: now
  }

  return collection()
    .insertOne(newDoc)
    .then((doc) => doc.ops[0])
    .catch((error) => {
      if (error.code === 11000) throw new Error('ALREADY_EXISTS')
      else throw error
    })
}

exports.find = (token) => collection()
  .findOne({token: token})
  .then((doc) => {
    if (doc) return doc
  })

exports.list = () => {
  return collection()
    .find()
    .toArray()
}

exports.update = (token, url, statusCode) => {
  const changeset = {
    url: url,
    status_code: statusCode,
    updated: new Date()
  }
  return collection()
    .findOneAndUpdate({token: token}, {
      $set: changeset
    }, {
      returnOriginal: false
    })
    .then((doc) => {
      if (doc.value) return doc.value
    })
}

exports.delete = (token) => collection()
  .findOneAndDelete({token: token})
  .then((doc) => {
    if (doc.value) return doc.value
  })
