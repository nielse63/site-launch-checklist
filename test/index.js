import assert from 'assert';
import launchChecklist from '../lib';

describe('launch-checklist', function () {
  this.timeout(0);

  let results

  before(function(done) {
    launchChecklist({
      url : 'https://cliquestudios.com/'
    }, function(err, data) {
      if(err) {
        throw new Error(err)
      }
      results = data
      done()
    });
  })

  it('should be a function', function () {
    assert(typeof launchChecklist === 'function', 'Module is not a function')
  })

  it('should return an object', function () {
    const type = {}.toString.call(results)
    assert.equal('[object Object]', type, 'Module does not return an object')
  })

  it('should have key `settings`', function () {
    const hasKey = {}.hasOwnProperty.call(results, 'settings');
    assert(hasKey, 'Module does not have key settings')
  })

  it('should have key `output`', function () {
    const hasKey = {}.hasOwnProperty.call(results, 'output');
    assert(hasKey, 'Module does not have key output')
  })

  it('results.output should have key `security`', function () {
    const hasKey = {}.hasOwnProperty.call(results.output, 'security');
    assert(hasKey, 'Module does not have key security')
  })

  it('results.output should have key `seo`', function () {
    const hasKey = {}.hasOwnProperty.call(results.output, 'seo');
    assert(hasKey, 'Module does not have key seo')
  })

  it('results.output should have key `performance`', function () {
    const hasKey = {}.hasOwnProperty.call(results.output, 'performance');
    assert(hasKey, 'Module does not have key performance')
  })

  it('results.output should have key `analytics`', function () {
    const hasKey = {}.hasOwnProperty.call(results.output, 'analytics');
    assert(hasKey, 'Module does not have key analytics')
  })

  it('results.output should have key `html-validation`', function () {
    const hasKey = {}.hasOwnProperty.call(results.output, 'html-validation');
    assert(hasKey, 'Module does not have key html-validation')
  })

  it('results.output should have key `css-validation`', function () {
    const hasKey = {}.hasOwnProperty.call(results.output, 'css-validation');
    assert(hasKey, 'Module does not have key css-validation')
  })

  it('results.output should have key `mobile`', function () {
    const hasKey = {}.hasOwnProperty.call(results.output, 'mobile');
    assert(hasKey, 'Module does not have key mobile')
  })

  it('results.output should have key `accessibility`', function () {
    const hasKey = {}.hasOwnProperty.call(results.output, 'accessibility');
    assert(hasKey, 'Module does not have key accessibility')
  })
});
