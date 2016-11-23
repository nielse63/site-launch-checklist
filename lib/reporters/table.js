
import _ from 'lodash'
import Table from 'cli-table'
import { colors } from '../constants'
import { hasKey } from '../utils'

const getDetails = function(test) {
  let output = [test.reason];
  if( ! hasKey(test, 'info') ) {
    return output[0]
  }

  const max = 5
  const values = test.info.map((object) => {
    const title = typeof object === 'string' ? object : object.title
    return ' - ' + title
  })
  const array = [...new Set(values)].slice(0, max)
  if( test.info.length > max ) {
    const diff = test.info.length - max
    array.push('')
    array.push(`...${diff} additional ${diff > 1 ? 'messages' : 'message'}`)
  }

  return output.concat(array).join('\n')
}

export default function(data) {

  // set up table
  const table = new Table({
    style: {
      head: ['green'],
      border: ['white']
    },
    head: ['Name', 'Passed', 'Details']
  });

  // set table data
  const keys = Object.keys(data.output)
  keys.forEach((key) => {
    const name = key
    const test = data.output[name]
    const color = test.passed ? 'green' : 'red'
    const passed = colors[color](test.passed ? '✓' : '✗');
    const details = test.passed ? '' : getDetails(test)

    table.push([name, passed, details])
  })

  console.log('\n' + table.toString())
};
