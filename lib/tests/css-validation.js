
import validator from 'w3c-css'
import { hasKey } from '../utils'
import { rtrim, trim } from 'validator'

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

      let info = []
      data.errors.forEach((error) => {
        const file = error.uri
        let selector = 'Invalid parameter'
        if( hasKey(error, 'context') ) {
          selector = error.context
        } else if( hasKey(error, 'skippedString') ) {
          selector = error.skippedString
        }
        let message = error.message || ''
        message = rtrim(message, ':')
        message = trim( message )
        info.push({
          title : selector,
          details : message,
          file : file,
        })
      })
      const count = data.errors.length
      resolve({
        name : 'css-validation',
        passed : ! count,
        reason : `${count} CSS errors were found`,
        info : info
      })
    })
  })
}
