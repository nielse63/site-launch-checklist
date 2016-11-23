import assert from 'assert'
import launchChecklist from '../lib'

let results

describe('launch-checklist', function () {
  this.timeout(0)

  before((done) => {
    launchChecklist({
      url: 'https://cliquestudios.com/',
    }, (err, data) => {
      if (err) {
        throw new Error(err)
      }
      results = data
      done()
    })
  })

  it('should be a function', () => {
    assert(typeof launchChecklist === 'function', 'Module is not a function')
  })

  it('should return an object', () => {
    const type = {}.toString.call(results)
    assert.equal('[object Object]', type, 'Module does not return an object')
  })

  it('should have key `settings`', () => {
    const hasKey = {}.hasOwnProperty.call(results, 'settings')
    assert(hasKey, 'Module does not have key settings')
  })

  it('should have key `output`', () => {
    const hasKey = {}.hasOwnProperty.call(results, 'output')
    assert(hasKey, 'Module does not have key output')
  })

  it('results.output should have key `Security`', () => {
    const hasKey = {}.hasOwnProperty.call(results.output, 'Security')
    assert(hasKey, 'Module does not have key Security')
  })

  it('results.output should have key `SEO`', () => {
    const hasKey = {}.hasOwnProperty.call(results.output, 'SEO')
    assert(hasKey, 'Module does not have key SEO')
  })

  it('results.output should have key `Performance`', () => {
    const hasKey = {}.hasOwnProperty.call(results.output, 'Performance')
    assert(hasKey, 'Module does not have key Performance')
  })

  it('results.output should have key `Analytics`', () => {
    const hasKey = {}.hasOwnProperty.call(results.output, 'Analytics')
    assert(hasKey, 'Module does not have key Analytics')
  })

  it('results.output should have key `HTML Validation`', () => {
    const hasKey = {}.hasOwnProperty.call(results.output, 'HTML Validation')
    assert(hasKey, 'Module does not have key HTML Validation')
  })

  it('results.output should have key `CSS Validation`', () => {
    const hasKey = {}.hasOwnProperty.call(results.output, 'CSS Validation')
    assert(hasKey, 'Module does not have key CSS Validation')
  })

  it('results.output should have key `Mobile`', () => {
    const hasKey = {}.hasOwnProperty.call(results.output, 'Mobile')
    assert(hasKey, 'Module does not have key Mobile')
  })

  it('results.output should have key `Accessibility`', () => {
    const hasKey = {}.hasOwnProperty.call(results.output, 'Accessibility')
    assert(hasKey, 'Module does not have key Accessibility')
  })

  it('results.output should have key `Favicons`', () => {
    const hasKey = {}.hasOwnProperty.call(results.output, 'Favicons')
    assert(hasKey, 'Module does not have key Favicons')
  })

  it('results.output should have key `Broken Links`', () => {
    const hasKey = {}.hasOwnProperty.call(results.output, 'Broken Links')
    assert(hasKey, 'Module does not have key Broken Links')
  })
})
