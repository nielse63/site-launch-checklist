import assert from 'assert'
import _ from 'lodash'
import stylish from '../../lib/reporters/stylish'
import sampleData from '../sample-output.json'

describe('reporters/stylish', () => {
  it('stylish should be a function', () => {
    assert(_.isFunction(stylish), 'stylish is not a plain object')
  })

  it('stylish should accept plain object', () => {
    assert.doesNotThrow(
      () => {
        stylish(sampleData)
      },
    )
  })

  it('stylish should throw data.settings type error', () => {
    assert.throws(
      () => {
        stylish({
          output: {},
          settings: '',
        })
      },
      /Settings value is not a JavaScript object/,
    )
  })

  it('stylish should throw data.output type error', () => {
    assert.throws(
      () => {
        stylish({
          output: '',
          settings: {},
        })
      },
      /Output value is not a JavaScript object/,
    )
  })

  it('stylish should throw `output` error', () => {
    assert.throws(
      () => {
        stylish({})
      },
      /Object does not have key `output`/,
    )
  })

  it('stylish should throw `type` error', () => {
    assert.throws(
      stylish.bind(null, ''),
      /Supplied data is not a JavaScript object/,
    )
  })
})
