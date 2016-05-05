'use strict'

// Middleware, that redirects non-authorized* requests to another location
// (*non-authorized means: requests without authorization header)
module.exports = (path, redirectUrl) => {
  return (req, res, next) => {
    if (req.path === path && !req.headers.authorization) {
      res.header('Location', redirectUrl).status(301).send({})
    } else {
      next()
    }
  }
}
