'use strict'

exports.odmInput = (data) => {
  return {
    url: String(data.url),
    status_code: parseInt(data.status_code) || 301
  }
}

exports.apiResponse = (doc) => {
  return {
    token: doc.token,
    url: doc.url,
    status_code: doc.status_code,
    created: doc.created.toISOString(),
    updated: doc.updated.toISOString()
  }
}

exports.token = (token) => {
  token = String(token)
  token = token.replace(/^\/+/, '')
  token = token.replace(/\/+$/, '')
  return token
}
