
import clc from 'cli-color'
import { colors } from '../constants'
import { getDetails, printTableHeader, killReport } from '../utils'

function getParams(data, name) {
  const test = data.output[name]
  const color = test.passed ? 'green' : 'red'
  const icon = colors[color](test.passed ? '✓' : '✗')
  const title = clc.underline(`${icon} ${name}`)

  return {
    test,
    title,
  }
}

export default function (data) {
  killReport(data)

  const keys = Object.keys(data.output)
  const output = printTableHeader(data.settings.url)

  keys.forEach(name => {
    const { test, title } = getParams(data, name)
    output.push(title)
    let string = ''
    if (test.passed) {
      string = test.success || `All ${name} requirements met`
    } else {
      string = getDetails(test)
    }
    output.push(string)
    output.push('')
  })

  console.log(output.join('\n'))
}
