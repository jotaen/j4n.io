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

exports.validate = (data) => {
  const iso8601 = /^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))$/
  if (typeof data.token !== 'string') return false
  if (typeof data.url !== 'string') return false
  if (typeof data.status_code !== 'number') return false
  if (typeof data.created !== 'string') return false
  if (typeof data.updated !== 'string') return false
  if (!iso8601.test(data.created)) return false
  if (!iso8601.test(data.updated)) return false

  return true
}
