import assert from 'assert'
import _ from 'lodash'
import request from '../../lib/request'
import htmlValidation from '../../lib/tests/html-validation'

let output
const TEST_URL = 'http://www.facebook.com/'

describe('tests/html-validation', function () {
  this.timeout(20000)

  before(done => {
    request(TEST_URL, (err, data) => {
      if (err) {
        throw new Error(err)
      }

      htmlValidation(data.body, data.url).then(results => {
        output = results
        done()
      })
    })
  })

  it('HTML Validation should be a function', () => {
    assert(
      _.isFunction(htmlValidation),
    )
  })

  it('HTML Validation should return object', () => {
    assert(
      _.isPlainObject(output),
    )
  })

  it('HTML Validation should have desired keys', () => {
    assert(_.has(output, 'passed'))
    assert(_.has(output, 'info'))
    assert(_.has(output, 'reason'))
  })

  it('HTML Validation should fail on invalid urls', done => {
    htmlValidation('', 'not_a_url')
      .catch(err => {
        assert.throws(
          () => {
            throw new Error(err)
          },
          Error,
        )
        done()
      },
    )
  })
})
