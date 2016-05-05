'use strict'

module.exports = (path, redirectUrl) => {
  return (req, res, next) => {
    if (req.path === path && req.headers.authorization) {
      next()
    } else {
      res.header('Location', redirectUrl).status(301).send({})
    }
  }
}
