import assert from 'assert'
import _ from 'lodash'
import table from '../../lib/reporters/table'

describe('reporters/table', function () {

  it('table should be a function', function () {
    assert(_.isFunction(table), 'table is not a plain object')
  })

  it('table should accept plain object', function () {
    assert.equal(table({output : {}}), undefined)
  })

  it('table should throw error', function () {
    assert.throws(
      table,
      /Supplied data is not a JavaScript object/
    )
  })

  it('table should throw error', function () {
    assert.throws(
      function() {
        table({
          key : ''
        })
      },
      /Object does not have key `output`/
    )
  })

  it('table should throw error', function () {
    assert.throws(
      function() {
        table({
          output :''
        })
      },
      /Output value is not a JavaScript object/
    )
  })
})
