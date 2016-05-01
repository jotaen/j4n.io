'use strict'

const db = require('../../app/bootstrap/db')
const config = require('../../app/bootstrap/config')
const shortlinks = require('../../app/odm')
const assert = require('assert')

before((done) => {
  db.init(config.dbUrl, 'shortlinks-integration-test-' + (new Date()).toISOString()).then(() => {
    done()
  }).catch((error) => {
    console.log(error)
    console.log('\n')
    console.log('>>> In order to run this test, you need to have a mongodb and')
    console.log('>>> provide the DB_HOST variable to the test process. E.g.')
    console.log('>>> $ DB_HOST=localhost:27017 npm test')
    process.exit(1)
  })
})

describe('ODM integration test', () => {
  it('should be empty initially', (done) => {
    shortlinks.list().then((result) => {
      assert(result.length === 0)
      done()
    })
  })

  it('should create a new document', (done) => {
    shortlinks.create('foo', 'http://google.com', 302).then((result) => {
      assert(result.token === 'foo')
      assert(result.url === 'http://google.com')
      assert(result.status_code === 302)
      done()
    })
  })

  it('should output information in correct format', (done) => {
    shortlinks.find('foo').then((result) => {
      assert(typeof result.token === 'string')
      assert(typeof result.url === 'string')
      assert(typeof result.status_code === 'number')
      assert(typeof result.created === 'string')
      assert(typeof result.updated === 'string')
      done()
    })
  })

  it('should handle the dates of a new document properly', (done) => {
    const start = new Date()
    shortlinks.create('baz', 'http://wikipedia.org').then((result) => {
      const end = new Date()
      const created = new Date(result.created)
      const updated = new Date(result.updated)
      assert(updated.valueOf() === created.valueOf())
      assert(created >= start)
      assert(created <= end)
      done()
    })
  })

  it('should create a document with default status code', (done) => {
    shortlinks.create('asdf', 'http://yahoo.com').then((result) => {
      assert(result.token === 'asdf')
      assert(result.url === 'http://yahoo.com')
      assert(result.status_code === 301)
      done()
    })
  })

  it('should list all documents', (done) => {
    shortlinks.list().then((result) => {
      assert(result.length === 3)
      assert(result[0].token === 'foo')
      assert(result[1].token === 'baz')
      assert(result[2].token === 'asdf')
      assert(result[0]._id === undefined)
      done()
    })
  })

  it('should find the new document', (done) => {
    shortlinks.find('foo').then((result) => {
      assert(result.token === 'foo')
      assert(result.url === 'http://google.com')
      assert(result.status_code === 302)
      done()
    })
  })

  it('should update an existing document', (done) => {
    shortlinks.update('foo', {url: 'http://bing.com'}).then((result) => {
      assert(result.token === 'foo')
      assert(result.url === 'http://bing.com')
      assert(result.status_code === 302)
      assert(result.updated > result.created)
      done()
    })
  })

  it('should delete an existing document', (done) => {
    shortlinks.delete('foo').then(() => {
      done()
    })
  })
})
