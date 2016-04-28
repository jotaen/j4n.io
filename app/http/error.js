'use strict'

exports.internal = (res) => {
  res.status(500).send({
    message: 'Error: Internal server error',
    code: 500
  })
}

exports.notFound = (res) => {
  res.status(404).send({
    message: 'Error: resource not found',
    code: 404
  })
}

exports.notAllowed = (res) => {
  res.status(405).header('Allow', 'GET, POST').send({
    message: 'Error: method not allowed',
    code: 405
  })
}
