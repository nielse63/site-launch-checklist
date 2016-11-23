
import _ from 'lodash'
import Table from 'cli-table'
import { colors } from '../constants'
import { getDetails } from '../utils'

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
