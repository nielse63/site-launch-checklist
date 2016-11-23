
export default function($) {
  const $body = $('body')
  const elements = {
    images : $body.find('img'),
  }

  const getImages = function($images) {
    let missing = 0
    $images.each(function(i, img) {
      const alt = $(img).attr('alt')
      if( ! alt ) {
        missing++
      }
    });
    return {
      passed : ! missing,
      reason : `${missing} image are missing alt tags`,
    }
  }

  const runTests = function() {
    let output = {
      passed : true
    }
    const tests = [
      getImages(elements.images),
    ]
    tests.forEach((results) => {
      if( ! results.passed ) {
        output = results
        return false
      }
    })
    output.name = 'accessibility'
    return output
  }

  return runTests()
}
