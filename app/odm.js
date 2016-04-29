'use strict'

const convert = require('./convert')

module.exports = (collection) => {
  const odm = {}

  odm.create = (token, url, statusCode) => {
    const now = new Date()
    const doc = convert.input({
      token: String(token),
      url: url,
      status_code: (typeof statusCode !== 'undefined' ? parseInt(statusCode) : 301),
      created: now,
      updated: now
    })

    return collection
      .insertOne(doc)
      .then((doc) => convert.output(doc.ops[0]))
      .catch((error) => {
        if (error.code === 11000) throw new Error('ALREADY_EXISTS')
        else throw error
      })
  }

  odm.find = (token) => collection
    .findOne({token: token})
    .then((doc) => {
      if (doc) return convert.output(doc)
    })

  odm.list = () => {
    return collection
      .find()
      .toArray()
      .then((docs) => docs.map(convert.output))
  }

  odm.update = (token, changeset) => {
    changeset.updated = new Date()
    return collection
      .findOneAndUpdate({token: token}, {
        $set: convert.input(changeset)
      }, {
        returnOriginal: false
      })
      .then((doc) => {
        if (doc.value) return convert.output(doc.value)
      })
  }

  odm.delete = (token) => collection
    .findOneAndDelete({token: token})
    .then((doc) => {
      if (doc.value) return convert.output(doc.value)
    })

  return odm
}
