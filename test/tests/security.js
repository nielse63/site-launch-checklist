import assert from 'assert'
import _ from 'lodash'
import cheerio from 'cheerio'
import https from 'https'

import request from '../../lib/request'
import security from '../../lib/tests/security'

let headers
let output
const TEST_URL = 'https://cliquestudios.com/'

describe('tests/security', function () {

  before(function(done) {
    request(TEST_URL, (err, data) => {
      if(err) {
        throw new Error(err)
      }

      headers = data.headers
      output = security(headers)
      done()
    })
  })

  it('Security should return object', function() {
    assert(
      _.isPlainObject(output)
    )
  })

  it('Security should have desired keys', function() {
    assert(_.has(output, 'passed'))
    assert(_.has(output, 'info'))
    assert(_.has(output, 'reason'))
  })
})
