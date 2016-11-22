
import _ from 'lodash'
import cheerio from 'cheerio'
import eachSeries from 'async/eachSeries'
import setupThrobber from 'cli-color/throbber'
import { colors } from './constants'
import { hasKey } from './utils'
import request from './request'
import getTests from './tests'

let interval

const before = function(name) {
  let count = 0
  interval = setInterval(() => {
    const str = `- Checking ${name}${'.'.repeat(count)}`
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    process.stdout.write( colors.blue(str) )
    count++
    if(count > 3) {
      count = 0
    }
  }, 250)
}

const after = function(name, next, error) {
  clearInterval(interval)

  const string = error ? `✗ Checking ${name} - Error` : `✓ Checking ${name} - Complete`
  const color = error ? 'red' : 'green'
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  process.stdout.write( `${colors[color](string)}\r\n` )
  next(error)
}

export default function(options = {}, callback) {

  // guards
  if( typeof options === 'function' ) {
    throw new Error('No settings passed to module. Exiting')
  }

  if( typeof options === 'string' ) {
    const tmp = {
      url : options
    }
    options = tmp
  }

  if( ! hasKey(options, 'url') ) {
    throw new Error('No url given. Exiting')
  }

  // create settings object
  const settings = _.extend({}, options);

  // ping server
  request(settings.url, (err, data) => {

    const tests = getTests(data)
    let output = {
      settings : settings,
      output : {}
    }

    eachSeries(tests, (object, next) => {
      before(object.name)

      Promise.all([object.function]).then((data) => {
        output.output[data[0].name] = data[0]
        after(object.name, next, null)
      }, error => {
        console.trace(error)
        after(object.name, next, error)
      })
    }, error => {
      if( error ) {
        return console.trace(error)
      }
      callback(null, output)
    })
  })
}
