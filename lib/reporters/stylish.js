
import clc from 'cli-color'
import { colors } from '../constants'
import { hasKey, wordWrap } from '../utils'

const width = clc.windowSize.width / 2

const getDetails = function(test) {
  let output = [test.reason];
  if( ! hasKey(test, 'info') ) {
    return output[0]
  }

  output[0] += ':'

  const values = test.info.map((object) => {
    const title = typeof object === 'string' ? object : object.title
    return wordWrap( ` - ${title}`, width)
  })
  const array = [...new Set(values)]
  return output.concat(array).join('\n')
}

export default function(data) {
  const keys = Object.keys(data.output)
  let output = [
    `Results - ${data.settings.url}`,
    '='.repeat(30)
  ]
  // const unused = null
  keys.forEach((name) => {
    const test = data.output[name]
    const color = test.passed ? 'green' : 'red'
    const icon = colors[color](test.passed ? '✓' : '✗')
    const title = clc.underline(`${icon} ${name}`)

    output.push(title)

    if( ! test.passed ) {
      output.push( getDetails(test) )
    }
    output.push('')
  })

  console.log(output.join('\n'))
}
