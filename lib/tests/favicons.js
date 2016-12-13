
import { getElement } from '../utils'

export default function ($) {
  if (!$) {
    throw new Error('No cheerio object provided')
  }
  const $head = $('head')
  const elements = {
    ios: $head.find('[rel="apple-touch-icon"][sizes="180x180"]'),
    desktop: $head.find('[rel="icon"]'),
    android: $head.find('[rel="manifest"], [name="theme-color"]'),
    safari: $head.find('[rel="mask-icon"]'),
  }

  const output = {
    passed: true,
    info: [],
  }
  const tests = [
    getElement(elements.ios, 'iOS icons'),
    getElement(elements.desktop, 'favicon'),
    getElement(elements.android, 'Android manifest and/or theme color'),
    getElement(elements.safari, 'Safari mask icon'),
  ]
  tests.forEach(results => {
    if (results.passed) {
      return
    }
    output.passed = false
    output.info.push(results.reason)
  })
  output.reason = `${output.info.length} ${output.info.length > 1 ? 'icons' : 'icon'} not found`
  return output
}
