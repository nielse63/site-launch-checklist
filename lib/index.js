
import _ from 'lodash'
import eachSeries from 'async/eachSeries'
import { colors } from './constants'
import { hasKey, cleanURL, IN_DEBUG } from './utils'
import request from './request'
import getTests from './tests'
import formats from './reporters'

// FIXME: Test fixme
let interval
const completed = []

const before = function (name) {
  let count = 0
  interval = setInterval(() => {
    const str = `- Checking ${name}${'.'.repeat(count)}`
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    process.stdout.write(colors.blue(str))
    count += 1
    if (count > 3) {
      count = 0
    }
  }, 250)
}

const after = function (name, object, next) {
  clearInterval(interval)
  if (completed.indexOf(name) > -1) {
    return
  }
  completed.push(name)

  const error = object.error || ''
  const string = error ? `✗ Checking ${name} - Error (${error})` : `✓ Checking ${name} - Complete`
  const color = error ? 'red' : 'green'
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  process.stdout.write(`${colors[color](string)}\r\n`)

  next()
}

const createSettings = function (options) {
  // create settings object
  const settings = _.extend({
    url: false,
    format: 'stylish',
  }, options)

  // parse and validate url
  settings.url = cleanURL(settings.url)

  return settings
}

export default function (arg1, callback = () => {}) {
  let options = arg1

  if (!options || _.isFunction(options)) {
    throw new Error('No settings passed to module. Exiting')
  }

  if (typeof options === 'string') {
    const tmp = {
      url: options,
    }
    options = tmp
  }

  // create settings object
  const settings = createSettings(options)

  if (!settings.url) {
    throw new Error('No url given. Exiting')
  }

  // ping server
  request(settings.url, (err, data) => {
    if (err) {
      return callback(err, null)
    }

    const tests = getTests(data)
    const results = {
      settings,
      output: {},
    }

    const worker = function (test, next) {
      before(test.name)

      Promise.all([test.function]).then(result => {
        const r = result[0]

        results.output[test.name] = r
        after(test.name, r, next)
      }).catch(error => {
        after(test.name, { error }, next)
      })
    }

    const afterTests = function (error) {
      if (error) {
        return callback(error, null)
      }

      if (hasKey(formats, settings.format)) {
        formats[settings.format](results)
      }


      if (IN_DEBUG) {
        return callback(null, results)
      }
      return process.exit()
    }

    return eachSeries(
      tests,
      worker,
      afterTests,
    )
  })
}
