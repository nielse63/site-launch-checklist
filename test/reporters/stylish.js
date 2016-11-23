import assert from 'assert'
import _ from 'lodash'
import stylish from '../../lib/reporters/stylish'

describe('reporters/stylish', function () {

  it('stylish should be a function', function () {
    assert(_.isFunction(stylish), 'stylish is not a plain object')
  })

  it('stylish should accept plain object', function () {
    assert.equal(stylish({output : {}}), undefined)
  })

  it('stylish should throw error', function () {
    assert.throws(
      stylish,
      /Supplied data is not a JavaScript object/
    )
  })

  it('stylish should throw error', function () {
    assert.throws(
      function() {
        stylish({
          key : ''
        })
      },
      /Object does not have key `output`/
    )
  })

  it('stylish should throw error', function () {
    assert.throws(
      function() {
        stylish({
          output :''
        })
      },
      /Output value is not a JavaScript object/
    )
  })

  it('stylish should throw error', function () {
    assert.throws(
      function() {
        stylish({
          settings :''
        })
      },
      /Settings value is not a JavaScript object/
    )
  })
})
