import assert from 'assert'
import _ from 'lodash'
import stylish from '../../lib/reporters/stylish'
import sampleData from '../../static/sample-data.json'

describe('reporters/stylish', () => {
  it('stylish should be a function', () => {
    assert(_.isFunction(stylish), 'stylish is not a plain object')
  })

  it('stylish should accept plain object', function () {
    assert.doesNotThrow(
      function () {
        stylish(sampleData)
      },
    )
  })
})
