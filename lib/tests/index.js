
import cheerio from 'cheerio'
import security from './security'
import seo from './seo'
import accessibility from './accessibility'
import brokenLinks from './broken-links'
import htmlValidation from './html-validation'
import cssValidation from './css-validation'
import performance from './performance'
import favicons from './favicons'
import analytics from './analytics'
import mobile from './mobile'

export default function(data) {
  const $ = cheerio.load(data.body)

  return [
  {
    name : 'Security',
    function : security(data.headers)
  }, {
    name : 'SEO',
    function : seo($)
  }, {
    name : 'Favicons',
    function : favicons($)
  }, {
    name : 'Analytics',
    function : analytics($)
  }, {
    name : 'HTML Validation',
    function : htmlValidation(data.body)
  }, {
    name : 'CSS Validation',
    function : cssValidation(data.url, data.status)
  }, {
    name : 'Performance',
    function : performance(data.url)
  }, {
    name : 'Mobile',
    function : mobile(data.url)
  }, {
    name : 'Broken Links',
    function : brokenLinks(data.body, data.url)
  }, {
    name : 'Accessibility',
    function : accessibility(data.url)
  }
  ]
}
