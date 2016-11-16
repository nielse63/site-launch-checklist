
const $ = require('cheerio');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const mod = {
	id   : 'meta-tags',
	name : 'Meta Tags',
	docs : {
		description : 'Evaluates the site\'s meta tags for any errors or missing information',
		category    : 'SEO'
	},
	messaging : {
		success  : '',
		fail     : '',
		howtofix : ''
	},
	context      : 'HTML',
	output       : {
		type  : 'array',
		value : []
	},
	failed : false,
	test(ctx) {

		// variables should be defined here
		const $body = ctx.get('DOMTree')
		const $tags = $body.find('meta, link:not([href*=".css"])')

		//----------------------------------------------------------------------
		// Helpers
		//----------------------------------------------------------------------

		// any helper functions should go here or else delete this section

		//----------------------------------------------------------------------
		// Public
		//----------------------------------------------------------------------

		let output = []
		$tags.each((i, item) => {
			output.push( $.html(item).trim() )
		})
		mod.output.value = output

		return mod;
	}
}

module.exports = mod
