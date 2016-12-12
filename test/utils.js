import assert from 'assert'
import _ from 'lodash'
import * as utils from '../lib/utils'

const TEST_STRING_INPUT = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt veritatis non unde, eius ducimus numquam, impedit, similique quasi nam ex sit dolor voluptate! Fugiat, architecto!'
const TEST_STRING_OUTPUT = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt veritatis\nnon unde, eius ducimus numquam, impedit, similique quasi nam ex sit dolor\nvoluptate! Fugiat, architecto!'

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
      assert(
        _.has(utils, 'cleanURL'),
        'Utils is missing `cleanURL`',
      )
    })

    it('cleanURL should be function', () => {
      assert(
        _.isFunction(utils.cleanURL),
        'utils.cleanURL is not a function',
      )
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

    it('cleanURL should throw no URL error', () => {
      assert.throws(
        utils.cleanURL,
        /No URL provided\./,
      )
    })

    it('cleanURL should throw invalid URL error', () => {
      assert.throws(
        utils.cleanURL.bind(null, 'howdy'),
        /Invalid URL/,
      )
    })
  })

  describe('#wordWrap', () => {
    it('utils should have `wordWrap`', () => {
      assert(
        _.has(utils, 'wordWrap'),
        'Utils is missing `wordWrap`',
      )
    })

    it('wordWrap should be function', () => {
      assert(
        _.isFunction(utils.wordWrap),
        'utils.wordWrap is not a function',
      )
    })

    it('wordWrap should require only one argument', () => {
      const actual = utils.wordWrap(TEST_STRING_INPUT)
      assert(actual)
    })

    it('wordWrap should pass', () => {
      const actual = utils.wordWrap(TEST_STRING_INPUT)
      assert.equal(actual, TEST_STRING_OUTPUT)
    })

    it('wordWrap should fix widows', () => {
      const INPUT = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt veritatis non unde, eius ducimus numquam, impedit, similique quasi nam ex sit dolor voluptate!'
      const OUTPUT = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt veritatis\nnon unde, eius ducimus numquam, impedit, similique quasi nam ex sit dolor voluptate!'
      const actual = utils.wordWrap(INPUT)
      assert.equal(actual, OUTPUT)
    })
  })

  describe('#getDetails', () => {
    it('utils should have `getDetails`', () => {
      assert(
        _.has(utils, 'getDetails'),
      )
    })

    it('getDetails should be function', () => {
      assert(
        _.isFunction(utils.getDetails),
        'utils.getDetails is not a function',
      )
    })
  })

  describe('#getInsightsURL', () => {
    it('utils should have `getInsightsURL`', () => {
      assert(
        _.has(utils, 'getInsightsURL'),
      )
    })

    it('getInsightsURL should be function', () => {
      assert(
        _.isFunction(utils.getInsightsURL),
        'utils.getInsightsURL is not a function',
      )
    })
  })

  describe('#getElement', () => {
    it('utils should have `getElement`', () => {
      assert(
        _.has(utils, 'getElement'),
      )
    })

    it('getElement should be function', () => {
      assert(
        _.isFunction(utils.getElement),
        'utils.getElement is not a function',
      )
    })
  })

  describe('#getTestResults', () => {
    it('utils should have `getTestResults`', () => {
      assert(
        _.has(utils, 'getTestResults'),
      )
    })

    it('getTestResults should be function', () => {
      assert(
        _.isFunction(utils.getTestResults),
        'utils.getTestResults is not a function',
      )
    })
  })

  describe('#printTableHeader', () => {
    it('utils should have `printTableHeader`', () => {
      assert(
        _.has(utils, 'printTableHeader'),
      )
    })

    it('printTableHeader should be function', () => {
      assert(
        _.isFunction(utils.printTableHeader),
        'utils.printTableHeader is not a function',
      )
    })

    it('printTableHeader should return empty string', () => {
      const actual = utils.printTableHeader()
      const expected = ''
      assert.equal(
        actual,
        expected,
      )
    })

    it('printTableHeader should return empty string', () => {
      const actual = utils.printTableHeader(null)
      const expected = ''
      assert.equal(
        actual,
        expected,
      )
    })

    it('printTableHeader should return empty string', () => {
      const actual = utils.printTableHeader('')
      const expected = ''
      assert.equal(
        actual,
        expected,
      )
    })

    it('printTableHeader should return array', () => {
      const actual = utils.printTableHeader('Howdy')
      assert(
        _.isArray(actual),
      )
    })
  })

  describe('#IN_DEBUG', () => {
    it('utils should have `IN_DEBUG`', () => {
      assert(_.has(utils, 'IN_DEBUG'))
    })

    it('IN_DEBUG should be boolean', () => {
      assert(_.isBoolean(utils.IN_DEBUG))
    })

    it('IN_DEBUG should be true', () => {
      process.env.NODE_ENV = 'debug'
      assert.equal(true, utils.IN_DEBUG)
    })
  })
})
