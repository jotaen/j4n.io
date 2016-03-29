# j4n.io

[![Build Status](https://api.travis-ci.org/jotaen/shortly.svg)](https://travis-ci.org/jotaen/shortly)
[![Code Climate](https://codeclimate.com/github/jotaen/shortly/badges/gpa.svg)](https://codeclimate.com/github/jotaen/shortly)
[![Test Coverage](https://codeclimate.com/github/jotaen/shortly/badges/coverage.svg)](https://codeclimate.com/github/jotaen/shortly/coverage)
![Dependencies](https://david-dm.org/jotaen/shortly.svg)

The source code of my [shortlink webservice](http://blog.jotaen.net/Toqw4/lets-build-a-rest-service).

## Usage

### Requirements

- NodeJS 5.5
- MongoDB 3.2

### Build

Run `npm install` on your UNIX CLI.

### Run

Run `npm start`. You need to provide the following parameters:

- `USERNAME` and `PASSWORD` as environment variables
- `--db` as option with the host of your mongoDB

E.g.: `USERNAME=admin PASSWORD=a npm start --db 192.168.59.103`

For your convenience, you can run `npm run dev-mode` (see `package.json`).

### Test

Run `npm test` for the complete test-suite including linter. See `package.json`
for the single commands, which are faster to run.

## TODOs for version 1.0

- Router: Make sure, the randomly created tokens by "POST /" are in fact unique
- (Global) versioning parameter
- api.yml: Insert authentication info
