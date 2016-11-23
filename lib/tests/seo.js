
export default function($) {
  const $head = $('head')
  const elements = {
    title : $head.find('title'),
    description : $head.find('meta[name="description"]'),
    canonical : $head.find('link[rel="canonical"]'),
    'open-graph' : $head.find('meta[property^="og:"]'),
    twitter : $head.find('meta[name^="twitter"]'),
  }

  const getTitle = function(title) {
    return {
      passed : !! title.length,
      reason : 'Missing document title',
    }
  }

  const getDescription = function(description) {
    return {
      passed : !! description.length,
      reason : 'Missing meta description',
    }
  }

  const getCanonical = function(meta) {
    return {
      passed : !! meta.length,
      reason : 'Missing canonical link',
    }
  }

  const getOpenGraph = function(meta) {
    return {
      passed : !! meta.length,
      reason : 'Missing open graph tags (used for Facebook sharing)',
    }
  }

  const getTwitter = function(meta) {
    return {
      passed : !! meta.length,
      reason : 'Missing Twitter card data',
    }
  }

  const runTests = function() {
    let output = {
      passed : true
    }
    const tests = [
      getTitle(elements.title),
      getDescription(elements.description),
      getCanonical(elements.canonical),
      getOpenGraph(elements['open-graph']),
      getTwitter(elements.twitter),
    ]
    tests.forEach((results) => {
      if( ! results.passed ) {
        output = results
        return false
      }
    })
    output.name = 'seo'
    output.success = 'All SEO requirements met'
    return output
  }

  return runTests()
}
