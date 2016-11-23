import assert from 'assert'
import _ from 'lodash'
import * as utils from '../lib/utils'

describe('utils', () => {
  describe('#hasKey', () => {
    const tmp = {
      key: 'value',
      'key-one': 'value',
    }

    it('utils should have `hasKey`', () => {
      assert(_.has(utils, 'hasKey'), 'Utils is missing `hasKey`')
    })

    it('hasKey should be function', () => {
      assert(typeof utils.hasKey === 'function', 'utils.hasKey is not a function')
    })

    it('hasKey should return true', () => {
      assert(utils.hasKey(tmp, 'key'))
    })

    it('hasKey should return true', () => {
      assert(utils.hasKey(tmp, 'key-one'))
    })

    it('hasKey should return false', () => {
      assert.equal(utils.hasKey(tmp, 'wrong'), false)
    })

    it('hasKey should return false', () => {
      assert.equal(utils.hasKey(tmp, 'toString'), false)
    })

    it('hasKey should return true', () => {
      tmp.toString = 'something'
      assert(utils.hasKey(tmp, 'toString'))
    })
  })

  describe('#isLocalhost', () => {
    it('utils should have `isLocalhost`', () => {
      assert(_.has(utils, 'isLocalhost'), 'Utils is missing `isLocalhost`')
    })

    it('isLocalhost should be function', () => {
      assert(typeof utils.isLocalhost === 'function', 'utils.isLocalhost is not a function')
    })

    it('isLocalhost should return true', () => {
      assert(utils.isLocalhost('http://localhost:8080'))
    })

    it('isLocalhost should return false', () => {
      assert.equal(utils.isLocalhost('http://google.com'), false)
    })
  })

  describe('#addProtocol', () => {
    it('utils should have `addProtocol`', () => {
      assert(_.has(utils, 'addProtocol'), 'Utils is missing `addProtocol`')
    })

    it('addProtocol should be function', () => {
      assert(typeof utils.addProtocol === 'function', 'utils.addProtocol is not a function')
    })

    it('addProtocol should keep protocol', () => {
      const actual = utils.addProtocol('http://localhost:8080')
      const expected = 'http://localhost:8080'
      assert.equal(actual, expected)
    })

    it('addProtocol should add protocol', () => {
      const actual = utils.addProtocol('localhost:8080')
      const expected = 'http://localhost:8080'
      assert.equal(actual, expected)
    })

    it('addProtocol should add protocol', () => {
      const actual = utils.addProtocol('something.com')
      const expected = 'http://something.com'
      assert.equal(actual, expected)
    })

    it('addProtocol should add protocol', () => {
      const actual = utils.addProtocol('//something.com')
      const expected = 'http://something.com'
      assert.equal(actual, expected)
    })
  })

  describe('#cleanURL', () => {
    it('utils should have `cleanURL`', () => {
      assert(_.has(utils, 'cleanURL'), 'Utils is missing `cleanURL`')
    })

    it('cleanURL should be function', () => {
      assert(typeof utils.cleanURL === 'function', 'utils.cleanURL is not a function')
    })

    it('cleanURL should pass', () => {
      const actual = utils.cleanURL('localhost:8080')
      const expected = 'http://localhost:8080'
      assert.equal(actual, expected)
    })

    it('cleanURL should pass', () => {
      const actual = utils.cleanURL('http://localhost')
      const expected = 'http://localhost'
      assert.equal(actual, expected)
    })

    it('cleanURL should throw error', () => {
      assert.throws(
        utils.cleanURL,
        /No URL provided\./,
      )
    })
  })
})
