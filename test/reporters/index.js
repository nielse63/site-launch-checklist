
import assert from 'assert'
import _ from 'lodash'
import reporters from '../../lib/reporters'

describe('reporters', () => {
  it('reporters should be an object', () => {
    assert(_.isPlainObject(reporters), 'reporters is not a plain object')
  })

  it('reporters should have key `table`', () => {
    assert(_.has(reporters, 'table'), 'key `table` not found on reporters')
  })

  it('reporters should have key `json`', () => {
    assert(_.has(reporters, 'json'), 'key `json` not found on reporters')
  })

  it('reporters should have key `stylish`', () => {
    assert(_.has(reporters, 'stylish'), 'key `stylish` not found on reporters')
  })
})
