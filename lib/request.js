
import http from 'http'
import https from 'https'

require('dotenv').config({ silent: true })

export const getRequestMethod = function (url) {
  return url.search(/^https:/) > -1 ? 'https' : 'http'
}

export default function (url, callback) {
  // defaults
  const methods = {
    https,
    http,
  }
  const cls = getRequestMethod(url)

  // get data
  methods[cls].get(url, (res) => {
    res.setEncoding('utf8')
    let body = ''
    res.on('data', (chunk) => {
      body += chunk
    })

    res.on('end', () => {
      const output = {
        url,
        status: res.statusCode,
        headers: res.headers,
        body,
      }
      if (callback && typeof callback === 'function') {
        callback(null, output)
      }
    })
  }).on('error', (e) => {
    if (callback && typeof callback === 'function') {
      callback(e.message, null)
    }
  })
}
