
import _ from 'lodash'
import eachSeries from 'async/eachSeries'
import { colors } from './constants'
import { hasKey, cleanURL } from './utils'
import request from './request'
import getTests from './tests'
import formats from './reporters'

let interval
let completed = []

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

const after = function(name, object, next) {
  clearInterval(interval)
  if( completed.indexOf(name) > -1 ) {
    return
  }
  completed.push(name)

  const error = object.error || ''
  const string = error ? `✗ Checking ${name} - Error (${error})` : `✓ Checking ${name} - Complete`
  const color = error ? 'red' : 'green'
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  process.stdout.write( `${colors[color](string)}\r\n` )
  next()
}

export default function(options, callback) {

  // guards
  if( ! options || typeof options === 'function' ) {
    throw new Error('No settings passed to module. Exiting')
  }

  if( typeof options === 'string' ) {
    const tmp = {
      url : options
    }
    options = tmp
  }

  // create settings object
  const settings = _.extend({
    url : null,
    format : 'stylish'
  }, options);

  // parse and validate url
  settings.url = cleanURL( settings.url )

  if( ! settings.url ) {
    throw new Error('No url given. Exiting')
  }

  // ping server
  request(settings.url, (err, data) => {

    if(err) {
      return callback(err, null)
    }

    const tests = getTests(data)
    let results = {
      settings : settings,
      output : {}
    }

    eachSeries(tests, (object, next) => {
      before(object.name)

      Promise.all([object.function]).then((data) => {
        const d = data[0]

        results.output[object.name] = d
        after(object.name, d, next)
      }).catch(error => {
        after(object.name, {error : error}, next)
      })
    }, error => {
      if( error ) {
        return callback(error, null)
      }

      // print results
      if( hasKey(formats, settings.format) ) {
        formats[settings.format](results)
      }

      callback(null, results)
    })
  })
}
