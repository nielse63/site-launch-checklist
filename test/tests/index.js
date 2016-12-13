import assert from 'assert'
import _ from 'lodash'
import request from '../../lib/request'
import tests from '../../lib/tests'

let output
const TEST_URL = 'http://www.facebook.com/'

describe('tests', function () {
  before(done => {
    request(TEST_URL, (err, data) => {
      if(err) {
        throw new Error(err)
      }

      output = tests(data)
      done()
    })
  })

  it('Tests should be a function', () => {
    assert(
      _.isFunction(tests),
    )
  })

  it('Tests should return an array', () => {
    assert(
      _.isArray( output )
    )
  })
})
