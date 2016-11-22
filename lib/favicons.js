
export default function($) {
  const $head = $('head')
  const elements = {
    ios : $head.find('[rel="apple-touch-icon"][sizes="180x180"]'),
    desktop : $head.find('[rel="icon"]'),
    android : $head.find('[rel="manifest"], [name="theme-color"]'),
    safari : $head.find('[rel="mask-icon"]'),
    // ms : $head.find('meta[name^="twitter"]'),
  }

  const getIos = function(element) {
    return {
      passed : !! element.length,
      reason : 'Missing iOS icons',
    }
  }

  const getDesktop = function(element) {
    return {
      passed : !! element.length,
      reason : 'Missing favicon',
    }
  }

  const getAndroid = function(element) {
    return {
      passed : !! element.length,
      reason : 'Missing Android manifest and/or theme color',
    }
  }

  const getSafari = function(element) {
    return {
      passed : !! element.length,
      reason : 'Missing Safari mask icon',
    }
  }

  const runTests = function() {
    let output = {
      passed : true
    }
    const tests = [
      getIos(elements.ios),
      getDesktop(elements.desktop),
      getAndroid(elements.android),
      getSafari(elements.safari),
    ]
    tests.forEach((results) => {
      if( ! results.passed ) {
        output = results
        return false
      }
    })
    output.name = 'favicons'
    return output
  }

  return runTests()
}
