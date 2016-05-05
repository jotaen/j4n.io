'use strict'

module.exports = (path, redirectUrl) => {
  return (req, res, next) => {
    if (req.path === path && !req.headers.authorization) {
      res.header('Location', redirectUrl).status(301).send({})
    } else {
      next()
    }
  }
}
