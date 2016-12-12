import assert from 'assert'
import _ from 'lodash'
import request from '../../lib/request'
import security from '../../lib/tests/security'

let headers
let output
const TEST_URL = 'https://cliquestudios.com/'

describe('tests/security', () => {
  before(done => {
    request(TEST_URL, (err, data) => {
      if (err) {
        throw new Error(err)
      }

      headers = data.headers
      output = security(headers)
      done()
    })
  })

  it('Security should return object', () => {
    assert(
      _.isPlainObject(output),
    )
  })

  it('Security should have desired keys', () => {
    assert(_.has(output, 'passed'))
    assert(_.has(output, 'info'))
    assert(_.has(output, 'reason'))
  })
})
