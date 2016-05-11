'use strict'

exports.apiResponse = (data) => {
  if (Object.keys(data).length !== 5) return false
  if (typeof data.token !== 'string') return false
  if (typeof data.status_code !== 'number') return false
  if (typeof data.url !== 'string') return false
  const iso8601 = /^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))$/
  if (typeof data.created !== 'string') return false
  if (typeof data.updated !== 'string') return false
  if (!iso8601.test(data.created)) return false
  if (!iso8601.test(data.updated)) return false

  return true
}

exports.errorResponse = (data) => {
  if (data.message.substr(0, 5) !== 'Error') return false
  if (data.code.toString()[0] !== '4') return false
  if (data.errors) {
    if (!Array.isArray(data.errors)) return false
  }

  return true
}

exports.apiInput = (data) => {
  if (Object.keys(data).length !== 2) return false
  if (typeof data.status_code !== 'number') return false
  if (typeof data.url !== 'string') return false

  return true
}

exports.odmOutput = (data) => {
  if (typeof data.token !== 'string') return false
  if (typeof data.status_code !== 'number') return false
  if (typeof data.url !== 'string') return false
  if (typeof data.created !== 'object') return false
  if (typeof data.updated !== 'object') return false

  return true
}
