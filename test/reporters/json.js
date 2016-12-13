import assert from 'assert'
import _ from 'lodash'
import json from '../../lib/reporters/json'
import sampleData from '../../static/sample-data.json'

describe('reporters/json', function () {
  it('json should be a function', function () {
    assert(_.isFunction(json), 'json is not a plain object')
  })

  it('json should accept plain object', function () {
    assert.doesNotThrow(
      function () {
        json(sampleData)
      },
    )
  })
})
