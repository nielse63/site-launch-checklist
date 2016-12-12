import assert from 'assert'
import should from 'should'
import launchChecklist from '../lib'

describe('launch-checklist', function () {
  this.timeout(0)

  // before(function(done) {
  //   launchChecklist({
  //     url: 'https://google.com/',
  //   }, function(err, data) {
  //     if (err) {
  //       throw new Error(err)
  //     }
  //     results = data
  //     done()
  //   })
  // })

  describe('index', function () {

    it('should be a function', function() {
      should.equal(typeof launchChecklist, 'function', 'Module is not a function')
    })

    // it('should return an object', function() {
    //   const type = {}.toString.call(results)
    //   assert.equal('[object Object]', type, 'Module does not return an object')
    // })

    // it('should have key `settings`', function() {
    //   const hasKey = {}.hasOwnProperty.call(results, 'settings')
    //   assert(hasKey, 'Module does not have key settings')
    // })

    // it('should have key `output`', function() {
    //   const hasKey = {}.hasOwnProperty.call(results, 'output')
    //   assert(hasKey, 'Module does not have key output')
    // })

    // it('results.output should have key `Security`', function() {
    //   const hasKey = {}.hasOwnProperty.call(results.output, 'Security')
    //   assert(hasKey, 'Module does not have key Security')
    // })

    // it('results.output should have key `SEO`', function() {
    //   const hasKey = {}.hasOwnProperty.call(results.output, 'SEO')
    //   assert(hasKey, 'Module does not have key SEO')
    // })

    // it('results.output should have key `Performance`', function() {
    //   const hasKey = {}.hasOwnProperty.call(results.output, 'Performance')
    //   assert(hasKey, 'Module does not have key Performance')
    // })

    // it('results.output should have key `Analytics`', function() {
    //   const hasKey = {}.hasOwnProperty.call(results.output, 'Analytics')
    //   assert(hasKey, 'Module does not have key Analytics')
    // })

    // it('results.output should have key `HTML Validation`', function() {
    //   const hasKey = {}.hasOwnProperty.call(results.output, 'HTML Validation')
    //   assert(hasKey, 'Module does not have key HTML Validation')
    // })

    // it('results.output should have key `CSS Validation`', function() {
    //   const hasKey = {}.hasOwnProperty.call(results.output, 'CSS Validation')
    //   assert(hasKey, 'Module does not have key CSS Validation')
    // })

    // it('results.output should have key `Mobile`', function() {
    //   const hasKey = {}.hasOwnProperty.call(results.output, 'Mobile')
    //   assert(hasKey, 'Module does not have key Mobile')
    // })

    // it('results.output should have key `Accessibility`', function() {
    //   const hasKey = {}.hasOwnProperty.call(results.output, 'Accessibility')
    //   assert(hasKey, 'Module does not have key Accessibility')
    // })

    // it('results.output should have key `Favicons`', function() {
    //   const hasKey = {}.hasOwnProperty.call(results.output, 'Favicons')
    //   assert(hasKey, 'Module does not have key Favicons')
    // })

    // it('results.output should have key `Broken Links`', function() {
    //   const hasKey = {}.hasOwnProperty.call(results.output, 'Broken Links')
    //   assert(hasKey, 'Module does not have key Broken Links')
    // })
  })
})
