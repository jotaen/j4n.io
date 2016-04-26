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

    return new Promise((resolve, reject) => {
      collection.insertOne(doc).then((doc) => {
        resolve(schema.output(doc.ops[0]))
      }).catch((error) => {
        if (error.code === 11000) {
          reject('ALREADY_EXISTS')
        } else {
          reject()
        }
      })
    })
  }

  odm.find = (token) => {
    return new Promise((resolve, reject) => {
      collection.findOne({token: token}).then((doc) => {
        if (!doc) {
          reject('NOT_FOUND')
        } else {
          resolve(schema.output(doc))
        }
      }).catch(() => {
        reject()
      })
    })
  }

  odm.list = () => {
    return new Promise((resolve, reject) => {
      collection.find().toArray().then((docs) => {
        const result = docs.map(schema.output)
        resolve(result)
      }).catch(() => {
        reject()
      })
    })
  }

  odm.update = (token, changeset) => {
    changeset.updated = new Date()

    return new Promise((resolve, reject) => {
      collection.findOneAndUpdate({token: token}, {
        $set: schema.input(changeset)
      }, {
        returnOriginal: false
      }).then((doc) => {
        if (!doc.value) {
          reject('NOT_FOUND')
        } else {
          resolve(schema.output(doc.value))
        }
      }).catch(() => {
        reject()
      })
    })
  }

  odm.delete = (token) => {
    return new Promise((resolve, reject) => {
      collection.findOneAndDelete({token: token}).then((doc) => {
        if (!doc.value) {
          reject('NOT_FOUND')
        } else {
          resolve(schema.output(doc.value))
        }
      }).catch(() => {
        reject()
      })
    })
  }

  return odm
}
