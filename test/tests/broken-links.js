import assert from 'assert'
import _ from 'lodash'
import cheerio from 'cheerio'
import https from 'https'

import request from '../../lib/request'
import brokenLinks from '../../lib/tests/broken-links'

let output
const TEST_URL = 'https://cliquestudios.com/'

describe('tests/broken-links', function () {
  this.timeout(10000)

  before(function(done) {
    request(TEST_URL, (err, data) => {
      if(err) {
        throw new Error(err)
      }

      brokenLinks(data.body, data.url).then(results => {
        output = results
        done()
      }, err => {
        throw new Error(err)
      })
    })
  })

  it('Broken Links should return object', function() {
    assert(
      _.isPlainObject(output)
    )
  })

  it('Broken Links should have desired keys', function() {
    assert(_.has(output, 'passed'))
    assert(_.has(output, 'info'))
    assert(_.has(output, 'reason'))
  })
})
