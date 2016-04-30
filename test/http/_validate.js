'use strict'

const validate = require('../_validate_output')

exports.shortlink = (body) => {
  return new Promise((resolve, reject) => {
    if (validate(body)) {
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
    if (body.code.toString()[0] !== '4') {
      reject()
    }
    if (body.errors && !Array.isArray(body.errors)) {
      reject()
    }
    resolve()
  })
}
