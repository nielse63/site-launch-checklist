
import clc from 'cli-color'
import { colors } from '../constants'
import { getDetails } from '../utils'

export default function(data) {
  const keys = Object.keys(data.output)
  let output = [
    `Results - ${data.settings.url}`,
    '='.repeat(30)
  ]

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
