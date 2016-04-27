'use strict'

const mongodb = require('mongodb')

module.exports = (dbPath, collectionName) => {
  return mongodb.connect(dbPath).then((db) => {
    const collection = db.collection(collectionName)
    return new Promise((resolve, reject) => {
      collection.createIndex({token: 1}, {unique: true}).then(() => {
        resolve(collection)
      }).catch((error) => {
        reject(error)
      })
    })
  })
}
