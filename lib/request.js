
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
  methods[cls].get(url, res => {
    res.setEncoding('utf8')
    let body = ''
    res.on('data', chunk => {
      body += chunk
    })

    res.on('end', () => {
      callback(null, {
        url,
        status: res.statusCode,
        headers: res.headers,
        body,
      })
    })
  }).on('error', e => {
    callback(e.message, null)
  })
}
