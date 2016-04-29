'use strict'

exports.input = (doc) => {
  const result = {}
  if (doc.token) result.token = String(doc.token)
  if (doc.url) result.url = String(doc.url)
  if (doc.status_code) result.status_code = parseInt(doc.status_code)
  if (doc.created) result.created = doc.created.toISOString()
  if (doc.updated) result.updated = doc.updated.toISOString()
  return result
}

exports.output = (doc) => {
  delete doc._id
  return doc
}
