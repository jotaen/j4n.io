'use strict'

exports.badRequest = (res, details) => {
  res.status(400)
  .send({
    message: 'Error – the request body is malformed.',
    code: 400,
    errors: details
  })
}

exports.unauthorized = (res) => {
  res.status(401)
  .send({
    message: 'Error: you are not authorized',
    code: 401
  })
}

exports.notFound = (res) => {
  res.status(404)
  .send({
    message: 'Error: resource not found',
    code: 404
  })
}

exports.methodNotAllowed = (res, allow) => {
  res.status(405)
  .header('Allow', allow)
  .send({
    message: 'Error: method not allowed',
    code: 405
  })
}

exports.internal = (res) => {
  res.status(500)
  .send({
    message: 'Error: internal server error',
    code: 500
  })
}
