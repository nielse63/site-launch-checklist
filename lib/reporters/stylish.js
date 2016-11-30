
import _ from 'lodash'
import clc from 'cli-color'
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

  const keys = Object.keys(data.output)
  let output = printTableHeader(data.settings.url)

  keys.forEach((name) => {
    const test = data.output[name]
    const color = test.passed ? 'green' : 'red'
    const icon = colors[color](test.passed ? '✓' : '✗')
    const title = clc.underline(`${icon} ${name}`)

    output.push(title)
    let string = ''
    if( test.passed ) {
      string = test.success || `All ${name} requirements met`
    } else {
      string = getDetails(test)
    }
    output.push( string )
    output.push('')
  })

  console.log(output.join('\n'))
}
