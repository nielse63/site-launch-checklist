
import _ from 'lodash'
import assert from 'assert'
import launchChecklist from '../lib'

const TEST_URL = 'https://google.com/'
let results

describe('launch-checklist', function () {
  this.timeout(0)

  before(done => {
    launchChecklist({
      url: TEST_URL,
    }, (err, data) => {
      if (err) {
        throw new Error(err)
      }
      results = data
      done()
    })
  })

  it('module is a function', () => {
    assert(_.isFunction(launchChecklist), 'Module is not a function')
  })

  it('module throws error if no options passed', () => {
    assert.throws(
      launchChecklist.bind(null, () => {}),
      /No settings passed to module\. Exiting/,
    )
  })

  it('module does not throw error if options object is passed', () => {
    assert.doesNotThrow(
      launchChecklist.bind(null, {
        url: TEST_URL,
      }),
    )
  })

  it('module does not throw error if options string is passed', () => {
    assert.doesNotThrow(
      launchChecklist.bind(null, TEST_URL),
    )
  })

  it('module accepts a callback', () => {
    assert.doesNotThrow(
      launchChecklist.bind(null, TEST_URL, () => {}),
    )
  })

  it('should return an object', () => {
    assert(
      _.isPlainObject(results),
      'Module does not return an object',
    )
  })

  it('should have key `settings`', () => {
    assert(
      _.has(results, 'settings'),
      'Module does not have key settings',
    )
  })

  it('should have key `output`', () => {
    assert(
      _.has(results, 'output'),
      'Module does not have key output',
    )
  })

  it('results.output should have key `Security`', () => {
    assert(
      _.has(results.output, 'Security'),
      'Module does not have key Security',
    )
  })

  it('results.output should have key `SEO`', () => {
    assert(
      _.has(results.output, 'SEO'),
      'Module does not have key SEO',
    )
  })

  it('results.output should have key `Performance`', () => {
    assert(
      _.has(results.output, 'Performance'),
      'Module does not have key Performance',
    )
  })

  it('results.output should have key `Analytics`', () => {
    assert(
      _.has(results.output, 'Analytics'),
      'Module does not have key Analytics',
    )
  })

  it('results.output should have key `HTML Validation`', () => {
    assert(
      _.has(results.output, 'HTML Validation'),
      'Module does not have key HTML Validation',
    )
  })

  it('results.output should have key `CSS Validation`', () => {
    assert(
      _.has(results.output, 'CSS Validation'),
      'Module does not have key CSS Validation',
    )
  })

  it('results.output should have key `Mobile`', () => {
    assert(
      _.has(results.output, 'Mobile'),
      'Module does not have key Mobile',
    )
  })

  it('results.output should have key `Accessibility`', () => {
    assert(
      _.has(results.output, 'Accessibility'),
      'Module does not have key Accessibility',
    )
  })

  it('results.output should have key `Favicons`', () => {
    assert(
      _.has(results.output, 'Favicons'),
      'Module does not have key Favicons',
    )
  })

  it('results.output should have key `Broken Links`', () => {
    assert(
      _.has(results.output, 'Broken Links'),
      'Module does not have key Broken Links',
    )
  })
})
