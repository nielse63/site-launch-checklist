
import { getElement } from '../utils'

export default function($) {
  const $head = $('head')
  const elements = {
    title : $head.find('title'),
    description : $head.find('meta[name="description"]'),
    canonical : $head.find('link[rel="canonical"]'),
    'open-graph' : $head.find('meta[property^="og:"]'),
    twitter : $head.find('meta[name^="twitter"]'),
  }

  const runTests = function() {
    let output = {
      passed : true,
      info : []
    }
    const tests = [
      getElement(elements.title, 'document title'),
      getElement(elements.description, 'meta description'),
      getElement(elements.canonical, 'canonical link'),
      getElement(elements['open-graph'], 'open graph tags (used for Facebook sharing)'),
      getElement(elements.twitter, 'Twitter card data'),
    ]
    tests.forEach((results) => {
      if( results.passed ) {
        return
      }
      output.passed = false
      output.info.push(results.reason)
    })
    output.reason = `${output.info.length} SEO ${output.info.length > 1 ? 'issues' : 'issue'} found`
    return output
  }

  return runTests()
}
