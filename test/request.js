
import assert from 'assert'
import _ from 'lodash'
import * as request from '../lib/request'

describe('request', function () {

  it('request.default should be an function', function () {
    assert(_.isFunction(request.default), 'request.default is not a function')
  })

  it('request.getRequestMethod should return `http`', function () {
    assert.equal(request.getRequestMethod('http://google.com'), 'http')
  })

  it('request.getRequestMethod should return `https`', function () {
    assert.equal(request.getRequestMethod('https://google.com'), 'https')
  })
})
