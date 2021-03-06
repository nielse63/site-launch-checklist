
import url from 'url'
import validator from 'validator'
import clc from 'cli-color'
import _ from 'lodash'

export const hasKey = function (object, key) {
  return _.has(object, key)
}

export const isLocalhost = function (string) {
  return validator.matches(String(string), /localhost|127\.0\.0\.1/i)
}

export const addProtocol = function (str) {
  let string = validator.ltrim(str, '/')
  if (!validator.matches(string, /^http/)) {
    string = `http://${string}`
  }
  const parsedUrl = url.parse(string)
  return validator.rtrim(url.format(parsedUrl), '/')
}

export const cleanURL = function (str) {
  if (!str) {
    throw new Error('No URL provided. Exiting')
  }

  const string = validator.trim(str.toString(), '/')
  const withProtocol = addProtocol(string)

  const options = {
    protocols: ['http', 'https'],
    require_protocol: true, // eslint-disable-line camelcase
  }
  if (!validator.isURL(withProtocol, options)) {
    throw new Error(`Invalid URL (${str}) provided. Exiting`)
  }

  return withProtocol
}

/* eslint-disable max-statements */
export const wordWrap = function (string, max = 80) {
  function getWords(str) {
    return str
      .toString()
      .split(/(\S+\s+)/)
      .reduce((acc, x) => {
        acc.push(x)
        return acc
      }, [])
  }

  function getLines(words) {
    return words.reduce((lines, word) => {
      if (word === '') {
        return lines
      }
      const chunk = word.replace(/\t/g, '    ')
      const i = lines.length - 1
      if (lines[i].length + chunk.length > max) {
        lines[i] = lines[i].replace(/\s+$/, '')
        chunk.split(/\n/).forEach(c => {
          lines.push(
            new Array(1).join(' ') + c.replace(/^\s+/, ''),
          )
        })
      } else if (chunk.match(/\n/)) {
        const xs = chunk.split(/\n/)
        lines[i] += xs.shift()
        xs.forEach(c => {
          lines.push(
            new Array(1).join(' ') + c.replace(/^\s+/, ''),
          )
        })
      } else {
        lines[i] += chunk
      }
      return lines
    }, [new Array(1).join(' ')])
  }

  const words = getWords(string)
  let output = getLines(words)

  // line up to first indent
  const idx = output[0].search(/\w/)
  if (idx) {
    output = output.map((line, i) => {
      if (!i) {
        return line
      }
      return ' '.repeat(idx) + line
    })
  }

  // prevent widows
  const lastLine = output[output.length - 1].trim()
  if (lastLine.split(/(\S+\s+)/).length === 1) {
    output[output.length - 2] += ` ${lastLine}`
    output.pop()
  }

  return output.join('\n')
}
/* eslint-enable max-statements */

export const getDetails = function (test) {
  if (test.passed && hasKey(test, 'success')) {
    test.reason = test.success
  }

  const output = [test.reason]
  if (!hasKey(test, 'info')) {
    return output[0]
  }

  output[0] += ':'
  const width = clc.windowSize.width / 2
  const values = test.info.map(object => {
    const title = typeof object === 'string' ? object : object.title
    return wordWrap(` - ${title}`, width)
  })
  const array = [...new Set(values)]
  return output.concat(array).join('\n')
}

export const getInsightsURL = function (req, strategy = 'desktop') {
  const ping = encodeURIComponent(req)
  return `https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url=${ping}&screenshot=false&strategy=${strategy}`
}

export const getElement = function ($element, key) {
  return {
    passed: !!$element.length,
    reason: `Missing ${key}`,
  }
}

export const getTestResults = function (info, msg) {
  return {
    passed: !info.length,
    reason: `${info.length} ${msg} found`,
    info,
  }
}

export const printTableHeader = function (title) {
  if (!title) {
    return ''
  }

  return [
    '',
    `Results - ${title}`,
    '='.repeat(30),
  ]
}

export const IN_DEBUG = hasKey(process.env, 'NODE_ENV') && process.env.NODE_ENV.toLowerCase() === 'debug'

function isNotObject(object) {
  if (!_.isPlainObject(object)) {
    throw new Error('Supplied data is not a JavaScript object')
  }
}

function isMissingKeys(object) {
  if (!_.has(object, 'output')) {
    throw new Error('Object does not have key `output`')
  }
}

function isInvalidKeys(object) {
  if (!_.isPlainObject(object.output)) {
    throw new Error('Output value is not a JavaScript object')
  }

  if (!_.isPlainObject(object.settings)) {
    throw new Error('Settings value is not a JavaScript object')
  }
}

export const killReport = function (data) {
  isNotObject(data)
  isMissingKeys(data)
  isInvalidKeys(data)
}
