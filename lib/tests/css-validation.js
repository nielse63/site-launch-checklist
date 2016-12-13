
import validator from 'w3c-css'
import { trim } from 'validator'
import { hasKey, getTestResults } from '../utils'

function cleanMessage(string) {
  const message = string.toString()
  const array = message.split(/\n|\r/)
  return array.map(line => trim(trim(line.replace(' :  ', ': '), ':'))).join('\n')
}

function getInfo(data) {
  return data.errors.reduce((acc, error) => {
    if (!hasKey(error, 'context') || !hasKey(error, 'message')) {
      return acc
    }

    const message = cleanMessage(error.message)
    if (acc.indexOf(message) < 0) {
      acc.push(message)
    }
    return acc
  }, [])
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

      const info = getInfo(data)
      resolve(
        getTestResults(info, 'CSS errors'),
      )
    })
  })
}
