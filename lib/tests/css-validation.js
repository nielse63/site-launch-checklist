
import validator from 'w3c-css'
import { hasKey } from '../utils'
import { rtrim, trim } from 'validator'

const cleanMessage = function(string) {
  let message = string.toString()
  message = rtrim(message, ':')
  return trim( message )
}

export default function(url, status) {
  if( status >= 400 ) {
    return {
      name : 'css-validation',
      error : true,
      passed : false,
      reason : `HTTP status code (${status}) is invalid. Cannot validate CSS.`
    }
  }

  return new Promise((resolve, reject) => {

    validator.validate({
      url : url,
      warning : 'no'
    }, (err, data) => {
      if(err) {
        return reject(err)
      }

      const info = data.errors.reduce((acc, error) => {
        if( ! hasKey(error, 'context') || ! hasKey(error, 'message') || ! error.message ) {
          return acc
        }
        const message = cleanMessage( error.message )
        if( acc.indexOf(message) > -1 ) {
          return acc
        }
        acc.push(message)
        return acc
      }, [])
      resolve({
        name : 'css-validation',
        passed : ! info.length,
        reason : `${info.length} CSS errors were found`,
        info : info
      })
    })
  })
}
