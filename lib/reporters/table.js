
import _ from 'lodash'
import Table from 'cli-table'
import { colors } from '../constants'
import { getDetails, printTableHeader } from '../utils'

export default function(data) {
  if( ! _.isPlainObject(data) ) {
    throw new Error('Supplied data is not a JavaScript object')
  }

  if( ! _.has(data, 'output') ) {
    throw new Error('Object does not have key `output`')
  }

  if( ! _.isPlainObject(data.output) ) {
    throw new Error('Output value is not a JavaScript object')
  }

  if( ! _.isPlainObject(data.settings) ) {
    throw new Error('Settings value is not a JavaScript object')
  }

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
    const details = test.passed ? `All ${name} requirements met` : getDetails(test)

    table.push([name, passed, details])
  })

  console.log( printTableHeader(data.settings.url).join('\n') )
  console.log('\n' + table.toString())
};
