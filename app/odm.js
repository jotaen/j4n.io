'use strict'

const schema = require('./schema')

module.exports = (collection) => {
  const odm = {}

  odm.create = (token, url, statusCode) => {
    const now = new Date()
    const doc = schema.input({
      token: String(token),
      url: url,
      status_code: (typeof statusCode !== 'undefined' ? parseInt(statusCode) : 301),
      created: now,
      updated: now
    })

    return collection
      .insertOne(doc)
      .then((doc) => schema.output(doc.ops[0]))
      .catch((error) => {
        if (error.code === 11000) throw new Error('ALREADY_EXISTS')
        else throw error
      })
  }

  odm.find = (token) => collection
    .findOne({token: token})
    .then((doc) => {
      if (doc) return schema.output(doc)
    })

  odm.list = () => {
    return collection
      .find()
      .toArray()
      .then((docs) => docs.map(schema.output))
  }

  odm.update = (token, changeset) => {
    changeset.updated = new Date()
    return collection
      .findOneAndUpdate({token: token}, {
        $set: schema.input(changeset)
      }, {
        returnOriginal: false
      })
      .then((doc) => {
        if (doc.value) return schema.output(doc.value)
      })
  }

  odm.delete = (token) => collection
    .findOneAndDelete({token: token})
    .then((doc) => {
      if (doc.value) return schema.output(doc.value)
    })

  return odm
}
