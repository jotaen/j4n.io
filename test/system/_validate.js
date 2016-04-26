'use strict'

const schema = require('../../app/schema')

exports.shortlink = (body) => {
  return new Promise((resolve, reject) => {
    if (schema.validate(body)) {
      resolve()
    } else {
      reject()
    }
  })
}

exports.error = (body) => {
  return new Promise((resolve, reject) => {
    if (body.message.substr(0, 5) !== 'Error') {
      reject()
    }
    if (body.code.toString()[0] !== 4) {
      reject()
    }
    if (body.errors && !Array.isArray(body.errors)) {
      reject()
    }
    resolve()
  })
}
