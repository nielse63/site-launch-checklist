
export default function ($) {
  const $html = $('html')
  const elements = {
    gtm: $html.find('[src*="googletagmanager.com"]'),
  }

  const getTagManager = function ($element) {
    return {
      passed: !!$element,
      reason: 'Unable to find Google Tag Manager code',
    }
  }

  return getTagManager(elements.gtm)
}
