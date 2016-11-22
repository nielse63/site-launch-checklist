
import validator from 'w3c-css'

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

      const count = data.errors.length
      resolve({
        name : 'css-validation',
        passed : ! count,
        reason : `${count} CSS errors were found`
      })
    })
  })
}
