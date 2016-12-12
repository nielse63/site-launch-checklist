import assert from 'assert'
import _ from 'lodash'
import table from '../../lib/reporters/table'
import sampleData from '../sample-output.json'

describe('reporters/table', function () {

  it('table should be a function', function () {
    assert(_.isFunction(table), 'table is not a plain object')
  })

  it('table should accept plain object', function () {
    assert.doesNotThrow(
      function() {
        table(sampleData)
      }
    )
  })

  it('table should throw data.settings type error', function () {
    assert.throws(
      table.bind(null, {
        output : {},
        settings : ''
      }),
      /Settings value is not a JavaScript object/
    )
  })

  it('table should throw data.output type error', function () {
    assert.throws(
      table.bind(null, {
        output : '',
        settings : {}
      }),
      /Output value is not a JavaScript object/
    )
  })

  it('table should throw `output` error', function () {
    assert.throws(
      table.bind(null, {key : ''}),
      /Object does not have key `output`/
    )
  })

  it('table should throw `type` error', function () {
    assert.throws(
      table.bind(null, ''),
      /Supplied data is not a JavaScript object/
    )
  })
})
