import assert from 'assert'
import _ from 'lodash'
import stylish from '../../lib/reporters/stylish'
import sampleData from '../sample-output.json'

describe('reporters/stylish', function () {

  it('stylish should be a function', function () {
    assert(_.isFunction(stylish), 'stylish is not a plain object')
  })

  it('stylish should accept plain object', function () {
    assert.doesNotThrow(
      function() {
        stylish(sampleData)
      }
    )
  })

  it('stylish should throw data.settings type error', function () {
    assert.throws(
      stylish.bind(null, {
        output : {},
        settings : ''
      }),
      /Settings value is not a JavaScript object/
    )
  })

  it('stylish should throw data.output type error', function () {
    assert.throws(
      stylish.bind(null, {
        output : '',
        settings : {}
      }),
      /Output value is not a JavaScript object/
    )
  })

  it('stylish should throw `output` error', function () {
    assert.throws(
      stylish.bind(null, {key : ''}),
      /Object does not have key `output`/
    )
  })

  it('stylish should throw `type` error', function () {
    assert.throws(
      stylish.bind(null, ''),
      /Supplied data is not a JavaScript object/
    )
  })
})
