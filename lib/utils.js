
import url from 'url'
import validator from 'validator'

export const hasKey = function(object, key) {
  return {}.hasOwnProperty.call(object, key);
}

export const isLocalhost = function(string) {
  return validator.matches(string, /localhost|127\.0\.0\.1/i)
}

export const addProtocol = function(string) {
  if( ! validator.matches(string, /^http/) ) {
    string = 'http://' + string
  }
  const parsedUrl = url.parse(string)
  if( parsedUrl.protocol ) {
    return url.format(parsedUrl)
  }
  parsedUrl.slashes = true
  parsedUrl.protocol = 'http:'
  return url.format(parsedUrl).replace(/\/\/\//g, '//')
}

export const isValidFQDN = function(string) {
  const parsedUrl = url.parse(string)
  const host = parsedUrl.host || parsedUrl.hostname
  return validator.isFQDN(host)
}

export const cleanURL = function(_string) {
  const originalUrl = _string
  if( ! _string || typeof _string !== 'string' ) {
    return ''
  }

  const string = validator.trim(String(_string), '/')
  const withProtocol = addProtocol(string)

  const options = {
    protocols: ['http', 'https'],
    'require_protocol': true, // eslint-disable-line camelcase
  }
  if( ! validator.isURL(withProtocol, options) ) {
    throw new Error(`Invalid URL (${originalUrl}) provided. Exiting`)
  }
  return withProtocol
}
