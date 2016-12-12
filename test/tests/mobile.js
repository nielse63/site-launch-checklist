import assert from 'assert'
import _ from 'lodash'
import cheerio from 'cheerio'
import https from 'https'

import request from '../../lib/request'
import mobile from '../../lib/tests/mobile'

let output
const TEST_URL = 'http://www.facebook.com/'

describe('tests/mobile', function () {
  this.timeout(300000)

  before(function(done) {
    mobile(TEST_URL).then(results => {
      output = results
      done()
    }, err => {
      throw new Error(err)
    })
  })

  it('Mobile should return object', function() {
    assert(
      _.isPlainObject(output)
    )
  })

  it('Mobile should have desired keys', function() {
    assert(_.has(output, 'passed'))
    assert(_.has(output, 'info'))
    assert(_.has(output, 'reason'))
  })
})
