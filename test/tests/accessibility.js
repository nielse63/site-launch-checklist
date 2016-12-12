import assert from 'assert'
import _ from 'lodash'
import https from 'https'

import request from '../../lib/request'
import accessibility from '../../lib/tests/accessibility'

let output
const TEST_URL = 'https://cliquestudios.com/'

describe('tests/accessibility', function () {
  this.timeout(20000)

  before(function(done) {
    accessibility(TEST_URL).then(results => {
      output = results
      done()
    }, err => {
      throw new Error(err)
    })
  })

  it('Accessibility should return object', function() {
    assert(
      _.isPlainObject(output)
    )
  })

  it('Accessibility should have desired keys', function() {
    assert(_.has(output, 'passed'))
    assert(_.has(output, 'info'))
    assert(_.has(output, 'reason'))
  })

  it('Accessibility should catch invalid urls', function(done) {
    accessibility('not_a_url')
      .catch(err => {
        assert.throws(
          function() {
            throw new Error(err)
          },
          /Error opening url/
        )
        done()
      }
    )
  })
})
