import assert from 'assert'
import _ from 'lodash'
import accessibility from '../../lib/tests/accessibility'

let output
const TEST_URL = 'https://cliquestudios.com/'

describe('tests/accessibility', function () {
  this.timeout(0)

  before(done => {
    accessibility(TEST_URL).then(results => {
      output = results
      done()
    }, err => {
      throw new Error(err)
    })
  })

  it('Accessibility should return object', () => {
    assert(
      _.isPlainObject(output),
    )
  })

  it('Accessibility should have desired keys', () => {
    assert(_.has(output, 'passed'))
    assert(_.has(output, 'info'))
    assert(_.has(output, 'reason'))
  })

  it('Accessibility should catch invalid urls', done => {
    accessibility('not_a_url')
      .catch(err => {
        assert.throws(
          () => {
            throw new Error(err)
          },
          /Error opening url/,
        )
        done()
      },
    )
  })
})
