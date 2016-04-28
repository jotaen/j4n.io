'use strict'

exports.internalError = (res) => {
  res
    .status(500)
    .send({
      message: 'Error: internal server error',
      code: 500
    })
}

exports.notFound = (res) => {
  res
    .status(404)
    .send({
      message: 'Error: resource not found',
      code: 404
    })
}

exports.methodNotAllowed = (res) => {
  res
    .status(405)
    .header('Allow', 'GET, POST, DELETE')
    .send({
      message: 'Error: method not allowed',
      code: 405
    })
}
