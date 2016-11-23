import assert from 'assert'
import _ from 'lodash'
import json from '../../lib/reporters/json'

describe('reporters/json', function () {

  it('json should be a function', function () {
    assert(_.isFunction(json), 'json is not a plain object')
  })

  it('json should accept plain object', function () {
    assert.equal(json({output : ''}), undefined)
  })

  it('json should throw error', function () {
    assert.throws(
      json,
      /Supplied data is not a JavaScript object/
    )
  })

  it('json should throw error', function () {
    assert.throws(
      function() {
        json({
          key : ''
        })
      },
      /Object does not have key `output`/
    )
  })
})
