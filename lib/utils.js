
import url from 'url'
import validator from 'validator'

export const hasKey = function(object, key) {
  return {}.hasOwnProperty.call(object, key);
}

export const isLocalhost = function(string) {
  return validator.matches(String(string), /localhost|127\.0\.0\.1/i)
}

export const addProtocol = function(string) {
  string = validator.ltrim(string, '/')
  if( ! validator.matches(string, /^http/) ) {
    string = 'http://' + string
  }
  const parsedUrl = url.parse(string)
  return validator.rtrim( url.format( parsedUrl ), '/' )
}

export const cleanURL = function(_string) {
  if( ! _string ) {
    throw new Error(`No URL provided. Exiting`)
  }

  _string = String(_string)
  const string = validator.trim(_string, '/')
  const withProtocol = addProtocol(string)

  const options = {
    protocols: ['http', 'https'],
    'require_protocol': true, // eslint-disable-line camelcase
  }
  if( ! validator.isURL(withProtocol, options) ) {
    throw new Error(`Invalid URL (${_string}) provided. Exiting`)
  }

  return withProtocol
}
