import assert from 'assert'
import _ from 'lodash'
import https from 'https'

import cssValidation from '../../lib/tests/css-validation'

let output
const TEST_URL = 'https://www.facebook.com/'

describe('tests/css-validation', function () {
  this.timeout(20000)

  before(function(done) {
    cssValidation(TEST_URL, 200).then(data => {
      output = data
      done()
    })
  })

  it('CSS Validation should return object', function() {
    assert(
      _.isPlainObject(output)
      )
  })

  it('CSS Validation should have desired keys', function() {
    assert(_.has(output, 'passed'))
    assert(_.has(output, 'info'))
    assert(_.has(output, 'reason'))
  })

  it('CSS Validation should catch 400 status', function(done) {
    cssValidation(TEST_URL, 404)
      .catch(err => {
        assert.throws(
          function() {
            throw new Error(err)
          },
          /Cannot validate CSS\./
        )
        done()
      }
    )
  })

  it('CSS Validation should fail on invalid urls', function(done) {
    cssValidation('not_a_url', 200)
      .catch(err => {
        assert.throws(
          function() {
            throw new Error(err)
          },
          /Invalid server response/
        )
        done()
      }
    )
  })
})
