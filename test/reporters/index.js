
import assert from 'assert'
import _ from 'lodash'
import reporters from '../../lib/reporters'

describe('reporters', function () {

  it('reporters should be an object', function () {
    assert(_.isPlainObject(reporters), 'reporters is not a plain object')
  })

  it('reporters should have key `table`', function () {
    assert(_.has(reporters, 'table'), 'key `table` not found on reporters')
  })

  it('reporters should have key `json`', function () {
    assert(_.has(reporters, 'json'), 'key `json` not found on reporters')
  })

  it('reporters should have key `stylish`', function () {
    assert(_.has(reporters, 'stylish'), 'key `stylish` not found on reporters')
  })
})
