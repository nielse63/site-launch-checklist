import assert from 'assert'
import _ from 'lodash'
import request from '../../lib/request'
import brokenLinks from '../../lib/tests/broken-links'

let output
const TEST_URL = 'https://cliquestudios.com/'

describe('tests/broken-links', function test() {
  this.timeout(0)

  before(done => {
    request(TEST_URL, (err, data) => {
      if (err) {
        throw new Error(err)
      }

      brokenLinks(data.body, data.url).then(results => {
        output = results
        done()
      })
    })
  })

  it('Broken Links should return object', () => {
    assert(
      _.isPlainObject(output),
    )
  })

  it('Broken Links should have desired keys', () => {
    assert(_.has(output, 'passed'))
    assert(_.has(output, 'info'))
    assert(_.has(output, 'reason'))
  })
})
