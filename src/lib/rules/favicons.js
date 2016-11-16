
const _ = require('lodash')

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const mod = {
	id   : 'favicons',
	name : 'Favicons',
	docs : {
		description : 'Evaluates the sites use of favicons, browser-config, and manifest files',
		category    : 'General'
	},
	messaging : {
		success  : 'All the correct favicons were found',
		fail     : 'Unable to meet all the favicon requirements:\r\n<%= messages %>',
		howtofix : [
			'The ideal favicon package would look something like this:',
			'\t<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">',
			'\t<link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">',
			'\t<link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">',
			'\t<link rel="manifest" href="/manifest.json">',
			'\t<meta name="theme-color" content="#ffffff">',
			'\t<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">'
		].join('\r\n')
	},
	context      : 'HTML',
	output       : {
		type  : 'object',
		value : {}
	},
	failed : false,
	test(ctx) {

		/*
		<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
		<link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
		<link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
		<link rel="manifest" href="/manifest.json">
		<meta name="theme-color" content="#ffffff">
		<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
		*/

		// variables should be defined here
		const $body = ctx.get('DOMTree')
		let attributes = {
			iOS : {
				selectors : ['[rel="apple-touch-icon"][sizes="180x180"]'],
				example : '<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">',
				found : true,
				message : 'Missing iOS Apple touch icon'
			},
			Desktop : {
				selectors : [
				'[rel="icon"][sizes="32x32"]',
				'[rel="icon"][sizes="16x16"]',
				],
				example : '<link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">\r\n<link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">',
				found : true,
				message : 'One, or both, of the favicon declarations weren\'t found'
			},
			Android : {
				selectors : [
				'[rel="manifest"]',
				'[name="theme-color"]',
				],
				example : '<link rel="manifest" href="/manifest.json">\r\n<meta name="theme-color" content="#ffffff">',
				found : true,
				message : 'The site\'s manifest.json file and/or theme color were not found'
			},
			Safari : {
				selectors : ['[rel="mask-icon"]'],
				example : '<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">',
				found : true,
				message : 'The Safari mask icon, used on the tabs of the browser, wasn\'t declared'
			},
		}

		//----------------------------------------------------------------------
		// Helpers
		//----------------------------------------------------------------------

		// any helper functions should go here or else delete this section

		//----------------------------------------------------------------------
		// Public
		//----------------------------------------------------------------------

		const keys = Object.keys(attributes)
		let messages = []
		keys.forEach((key) => {
			let info = attributes[key]
			const selectors = info.selectors

			// find elements
			selectors.forEach((selector) => {
				const $element = $body.find(selector)

				info.found = ! info.found ? false : !! $element.length
			})

			if( ! info.found ) {
				messages.push(' - ' + info.message)
			}

			// set back on object
			attributes[key] = info
		})

		// set the value
		mod.output.value = attributes

		if( messages.length ) {
			const compiled = _.template( mod.messaging.fail )
			mod.messaging.fail = compiled({
				messages : messages.join('\r\n')
			})
			mod.failed = true
		}

		return mod;
	}
}

module.exports = mod
