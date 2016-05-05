'use strict'

module.exports = (string) => {
  string = string.replace(/^\/+/, '')
  string = string.replace(/\/+$/, '')
  return string
}
