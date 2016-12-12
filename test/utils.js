import assert from 'assert'
import _ from 'lodash'
import * as utils from '../lib/utils'

const TEST_STRING_INPUT = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt veritatis non unde, eius ducimus numquam, impedit, similique quasi nam ex sit dolor voluptate! Fugiat, architecto!'
const TEST_STRING_OUTPUT = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt veritatis\nnon unde, eius ducimus numquam, impedit, similique quasi nam ex sit dolor\nvoluptate! Fugiat, architecto!'

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
      assert(
        _.has(utils, 'cleanURL'),
        'Utils is missing `cleanURL`'
      )
    })

    it('cleanURL should be function', function() {
      assert(
        _.isFunction(utils.cleanURL),
        'utils.cleanURL is not a function'
      )
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

    it('cleanURL should throw no URL error', function() {
      assert.throws(
        utils.cleanURL,
        /No URL provided\./,
      )
    })

    it('cleanURL should throw invalid URL error', function() {
      assert.throws(
        utils.cleanURL.bind(null, 'howdy'),
        /Invalid URL/,
      )
    })
  })

  describe('#wordWrap', function() {
    it('utils should have `wordWrap`', function() {
      assert(
        _.has(utils, 'wordWrap'),
        'Utils is missing `wordWrap`'
      )
    })

    it('wordWrap should be function', function() {
      assert(
        _.isFunction(utils.wordWrap),
        'utils.wordWrap is not a function'
      )
    })

    it('wordWrap should require only one argument', function() {
      const actual = utils.wordWrap(TEST_STRING_INPUT)
      assert(actual)
    })

    it('wordWrap should pass', function() {
      const actual = utils.wordWrap(TEST_STRING_INPUT)
      assert.equal(actual, TEST_STRING_OUTPUT)
    })

    it('wordWrap should fix widows', function() {
      const INPUT = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt veritatis non unde, eius ducimus numquam, impedit, similique quasi nam ex sit dolor voluptate!'
      const OUTPUT = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt veritatis\nnon unde, eius ducimus numquam, impedit, similique quasi nam ex sit dolor voluptate!'
      const actual = utils.wordWrap(INPUT)
      assert.equal(actual, OUTPUT)
    })
  })

  describe('#getDetails', function() {
    it('utils should have `getDetails`', function() {
      assert(
        _.has(utils, 'getDetails')
      )
    })

    it('getDetails should be function', function() {
      assert(
        _.isFunction(utils.getDetails),
        'utils.getDetails is not a function'
      )
    })
  })

  describe('#getInsightsURL', function() {
    it('utils should have `getInsightsURL`', function() {
      assert(
        _.has(utils, 'getInsightsURL')
      )
    })

    it('getInsightsURL should be function', function() {
      assert(
        _.isFunction(utils.getInsightsURL),
        'utils.getInsightsURL is not a function'
      )
    })
  })

  describe('#getElement', function() {
    it('utils should have `getElement`', function() {
      assert(
        _.has(utils, 'getElement')
      )
    })

    it('getElement should be function', function() {
      assert(
        _.isFunction(utils.getElement),
        'utils.getElement is not a function'
      )
    })
  })

  describe('#getTestResults', function() {
    it('utils should have `getTestResults`', function() {
      assert(
        _.has(utils, 'getTestResults')
      )
    })

    it('getTestResults should be function', function() {
      assert(
        _.isFunction(utils.getTestResults),
        'utils.getTestResults is not a function'
      )
    })
  })

  describe('#printTableHeader', function() {
    it('utils should have `printTableHeader`', function() {
      assert(
        _.has(utils, 'printTableHeader')
      )
    })

    it('printTableHeader should be function', function() {
      assert(
        _.isFunction(utils.printTableHeader),
        'utils.printTableHeader is not a function'
      )
    })

    it('printTableHeader should return empty string', function() {
      const actual = utils.printTableHeader()
      const expected = ''
      assert.equal(
        actual,
        expected
      )
    })

    it('printTableHeader should return empty string', function() {
      const actual = utils.printTableHeader(null)
      const expected = ''
      assert.equal(
        actual,
        expected
      )
    })

    it('printTableHeader should return empty string', function() {
      const actual = utils.printTableHeader('')
      const expected = ''
      assert.equal(
        actual,
        expected
      )
    })

    it('printTableHeader should return array', function() {
      const actual = utils.printTableHeader('Howdy')
      assert(
        _.isArray(actual)
      )
    })
  })

  describe('#IN_DEBUG', function() {
    it('utils should have `IN_DEBUG`', function() {
      assert(_.has(utils, 'IN_DEBUG'))
    })

    it('IN_DEBUG should be boolean', function() {
      assert(_.isBoolean(utils.IN_DEBUG))
    })

    it('IN_DEBUG should be true', function() {
      process.env.NODE_ENV = 'debug'
      assert.equal(true, utils.IN_DEBUG)
    })
  })
})
