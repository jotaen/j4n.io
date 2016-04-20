# j4n.io

[![Build Status](https://api.travis-ci.org/jotaen/j4n.io.svg)](https://travis-ci.org/jotaen/j4n.io)
[![Code Climate](https://codeclimate.com/github/jotaen/j4n.io/badges/gpa.svg)](https://codeclimate.com/github/jotaen/j4n.io)
[![Test Coverage](https://codeclimate.com/github/jotaen/j4n.io/badges/coverage.svg)](https://codeclimate.com/github/jotaen/j4n.io/coverage)
![Dependencies](https://david-dm.org/jotaen/j4n.io.svg)

The source code of my [shortlink webservice](http://blog.jotaen.net/Toqw4/lets-build-a-rest-service).

## Usage

### Requirements

- NodeJS 5.5
- MongoDB 3.2

### Build

Run `npm install` on your UNIX CLI.

### Run

Run `npm start`.

### Test

Run `npm test` for the complete test-suite including linter. See `package.json`
for the single commands, which are faster to run.

## TODOs for version 1.0

- Router: Make sure, the randomly created tokens by "POST /" are in fact unique
- (Global) versioning parameter
- api.yml: Insert authentication info
