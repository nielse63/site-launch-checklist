import assert from 'assert'
import _ from 'lodash'
import json from '../../lib/reporters/json'
import sampleData from '../sample-output.json'

describe('reporters/json', () => {
  it('json should be a function', () => {
    assert(_.isFunction(json), 'json is not a plain object')
  })

  it('json should accept plain object', () => {
    assert.doesNotThrow(
      () => {
        json(sampleData)
      },
    )
  })

  it('json should throw `output` error', () => {
    assert.throws(
      json.bind(null, { key: '' }),
      /Object does not have key `output`/,
    )
  })

  it('json should throw `type` error', () => {
    assert.throws(
      json.bind(null, ''),
      /Supplied data is not a JavaScript object/,
    )
  })
})
