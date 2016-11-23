import assert from 'assert'
import _ from 'lodash'
import * as constants from '../lib/constants'

describe('constants', function () {

  it('constants should be an object', function () {
    assert(_.isPlainObject(constants), 'constants is not a plain object')
  })

  it('constants should have key `colors`', function () {
    assert(_.has(constants, 'colors'), 'key `colors` not found on constants')
  })

  describe('#colors', function () {
    it('constants.colors should have key `green`', function () {
      assert(_.has(constants.colors, 'green'), 'key `green` not found on constants.colors')
    })

    it('constants.colors should have key `blue`', function () {
      assert(_.has(constants.colors, 'blue'), 'key `blue` not found on constants.colors')
    })

    it('constants.colors should have key `red`', function () {
      assert(_.has(constants.colors, 'red'), 'key `red` not found on constants.colors')
    })
  })
})
