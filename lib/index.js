
import _ from 'lodash'
import eachSeries from 'async/eachSeries'
import { colors } from './constants'
import { cleanURL } from './utils'
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
    url : null
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
    let output = {
      settings : settings,
      output : {}
    }

    eachSeries(tests, (object, next) => {
      before(object.name)

      Promise.all([object.function]).then((data) => {
        const d = data[0]
        output.output[d.name] = d
        if( d.error ) {
          return after(object.name, next, d.reason)
        }
        after(object.name, next, null)
      }).catch(error => {
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