'use strict'

module.exports = (isValid, done) => {
  return (err, res) => {
    if (err) {
      done(err)
      return
    }
    if (!res.body) {
      done(new Error('Response does not contain a body'))
      return
    }
    if (isValid(res.body)) {
      done()
      return
    }

    done(new Error('Response body validation failed'))
  }
}
