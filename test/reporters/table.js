import assert from 'assert'
import _ from 'lodash'
import table from '../../lib/reporters/table'
import sampleData from '../sample-output.json'

describe('reporters/table', () => {
  it('table should be a function', () => {
    assert(_.isFunction(table), 'table is not a plain object')
  })

  // it('table should accept plain object', () => {
  //   assert.doesNotThrow(
  //     table.bind(null, sampleData),
  //   )
  // })

  it('table should throw data.settings type error', () => {
    assert.throws(
      table.bind(null, {
        output: {},
        settings: '',
      }),
      /Settings value is not a JavaScript object/,
    )
  })

  it('table should throw data.output type error', () => {
    assert.throws(
      table.bind(null, {
        output: '',
        settings: {},
      }),
      /Output value is not a JavaScript object/,
    )
  })

  it('table should throw `output` error', () => {
    assert.throws(
      table.bind(null, {}),
      /Object does not have key `output`/,
    )
  })

  it('table should throw `type` error', () => {
    assert.throws(
      table.bind(null, ''),
      /Supplied data is not a JavaScript object/,
    )
  })
})
