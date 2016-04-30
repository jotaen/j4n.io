'use strict'

const mongodb = require('mongodb')

let savedCollection

exports.init = (dbPath, collectionName) => {
  return mongodb.connect(dbPath).then((db) => {
    const collection = db.collection(collectionName)
    return new Promise((resolve, reject) => {
      collection.createIndex({token: 1}, {unique: true}).then(() => {
        savedCollection = collection
        resolve(collection)
      }).catch((error) => {
        reject(error)
      })
    })
  })
}

exports.collection = () => savedCollection
