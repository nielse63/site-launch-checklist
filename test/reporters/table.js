import assert from 'assert'
import _ from 'lodash'
import table from '../../lib/reporters/table'
import sampleData from '../../static/sample-data.json'

describe('reporters/table', () => {
  it('table should be a function', () => {
    assert(_.isFunction(table), 'table is not a plain object')
  })

  it('table should accept plain object', function () {
    assert.doesNotThrow(
      function () {
        table(sampleData)
      },
    )
  })
})
