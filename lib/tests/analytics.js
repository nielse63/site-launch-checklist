
export default function($) {
  const $html = $('html')
  const elements = {
    gtm : $html.find('[src*="googletagmanager.com"]'),
  }

  const getTagManager = function($element) {
    return {
      passed : !! $element,
      reason : 'No Google Tag Manager code found',
    }
  }

  const runTests = function() {
    let output = {
      passed : true
    }
    const tests = [
      getTagManager(elements.gtm),
    ]
    tests.forEach((results) => {
      if( ! results.passed ) {
        output = results
        return false
      }
    })
    output.success = 'Site includes reference to Google Tag Manager'
    return output
  }

  return runTests()
}
