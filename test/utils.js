import assert from 'assert'
import _ from 'lodash'
import * as utils from '../lib/utils'

describe('utils', function() {
  describe('#hasKey', function() {
    const tmp = {
      key: 'value',
      'key-one': 'value',
    }

    it('utils should have `hasKey`', function() {
      assert(_.has(utils, 'hasKey'), 'Utils is missing `hasKey`')
    })

    it('hasKey should be function', function() {
      assert(typeof utils.hasKey === 'function', 'utils.hasKey is not a function')
    })

    it('hasKey should return true', function() {
      assert(utils.hasKey(tmp, 'key'))
    })

    it('hasKey should return true', function() {
      assert(utils.hasKey(tmp, 'key-one'))
    })

    it('hasKey should return false', function() {
      assert.equal(utils.hasKey(tmp, 'wrong'), false)
    })

    it('hasKey should return false', function() {
      assert.equal(utils.hasKey(tmp, 'toString'), false)
    })

    it('hasKey should return true', function() {
      tmp.toString = 'something'
      assert(utils.hasKey(tmp, 'toString'))
    })
  })

  describe('#isLocalhost', function() {
    it('utils should have `isLocalhost`', function() {
      assert(_.has(utils, 'isLocalhost'), 'Utils is missing `isLocalhost`')
    })

    it('isLocalhost should be function', function() {
      assert(typeof utils.isLocalhost === 'function', 'utils.isLocalhost is not a function')
    })

    it('isLocalhost should return true', function() {
      assert(utils.isLocalhost('http://localhost:8080'))
    })

    it('isLocalhost should return false', function() {
      assert.equal(utils.isLocalhost('http://google.com'), false)
    })
  })

  describe('#addProtocol', function() {
    it('utils should have `addProtocol`', function() {
      assert(_.has(utils, 'addProtocol'), 'Utils is missing `addProtocol`')
    })

    it('addProtocol should be function', function() {
      assert(typeof utils.addProtocol === 'function', 'utils.addProtocol is not a function')
    })

    it('addProtocol should keep protocol', function() {
      const actual = utils.addProtocol('http://localhost:8080')
      const expected = 'http://localhost:8080'
      assert.equal(actual, expected)
    })

    it('addProtocol should add protocol', function() {
      const actual = utils.addProtocol('localhost:8080')
      const expected = 'http://localhost:8080'
      assert.equal(actual, expected)
    })

    it('addProtocol should add protocol', function() {
      const actual = utils.addProtocol('something.com')
      const expected = 'http://something.com'
      assert.equal(actual, expected)
    })

    it('addProtocol should add protocol', function() {
      const actual = utils.addProtocol('//something.com')
      const expected = 'http://something.com'
      assert.equal(actual, expected)
    })
  })

  describe('#cleanURL', function() {
    it('utils should have `cleanURL`', function() {
      assert(_.has(utils, 'cleanURL'), 'Utils is missing `cleanURL`')
    })

    it('cleanURL should be function', function() {
      assert(typeof utils.cleanURL === 'function', 'utils.cleanURL is not a function')
    })

    it('cleanURL should pass', function() {
      const actual = utils.cleanURL('localhost:8080')
      const expected = 'http://localhost:8080'
      assert.equal(actual, expected)
    })

    it('cleanURL should pass', function() {
      const actual = utils.cleanURL('http://localhost')
      const expected = 'http://localhost'
      assert.equal(actual, expected)
    })

    it('cleanURL should throw error', function() {
      assert.throws(
        utils.cleanURL,
        /No URL provided\./,
      )
    })
  })
})
