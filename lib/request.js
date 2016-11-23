
import http from 'http'
import https from 'https'
require('dotenv').config({silent: true})

export const getRequestMethod = function (url) {
  return url.search(/^https:/) > -1 ? 'https' : 'http'
}

export default function (url, callback) {
  // defaults
  callback = callback || function () {}

  const methods = {
    https: https,
    http: http
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
        url: url,
        status: res.statusCode,
        headers: res.headers,
        body: body
      }
      callback(null, output)
    })
  }).on('error', (e) => {
    callback(e.message, null)
  })
}
