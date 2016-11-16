
var $ = require('cheerio')
const utils = require('../utils')

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const mod = {
	id   : 'alt-tags',
	name : 'Alt Tags',
	docs : {
		description : 'Validates image alt tags',
		category    : 'Accessibility'
	},
	messaging : {
		success  : 'All <img> tags have an [alt] attribute',
		fail     : 'Some of your <img> tags don\'t have an [alt] attribute.',
		howtofix : ''
	},
	context      : 'HTML',
	output       : {
		type  : 'object',
		value : {}
	},
	failed : false,
	test(ctx) {

		// variables should be defined here
		mod.output.value = [];
		const $body = ctx.get('DOMTree')

		//----------------------------------------------------------------------
		// Helpers
		//----------------------------------------------------------------------

		// any helper functions should go here or else delete this section

		//----------------------------------------------------------------------
		// Public
		//----------------------------------------------------------------------

		let output = {
			success : [],
			fail : []
		}
		$body.find('img').each((i, item) => {
			const alt = $(item).attr('alt')
			const html = $.html(item).trim()
			if( ! alt ) {
				output.fail.push(html)
			} else {
				output.success.push(html)
			}
		})

		mod.failed = !! output.fail.length
		mod.output.value = output

		return mod
	}
}

module.exports = mod
