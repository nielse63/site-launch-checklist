
import validator from 'w3c-css'
import { hasKey, getTestResults } from '../utils'
import { rtrim, trim } from 'validator'

const cleanMessage = function (string) {
  const message = string.toString()
  const array = message.split(/\n|\r/)
  return array.map(line => trim(trim(line.replace(' :  ', ': '), ':'))).join('\n')
}

export default function (url, status) {
  return new Promise((resolve, reject) => {
    if (status >= 400) {
      return reject(`HTTP status code (${status}) is invalid. Cannot validate CSS.`)
    }

    validator.validate({
      url,
      warning: 'no',
    }, (err, data) => {
      if (err) {
        return reject(err)
      }

      const info = data.errors.reduce((acc, error) => {
        if (!hasKey(error, 'context') || !hasKey(error, 'message') || !error.message) {
          return acc
        }

        const message = cleanMessage(error.message)
        if (acc.indexOf(message) > -1) {
          return acc
        }
        acc.push(message)
        return acc
      }, [])

      resolve(
        getTestResults(info, 'CSS errors'),
      )
    })
  })
}
