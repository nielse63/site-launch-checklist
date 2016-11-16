
var $ = require('cheerio')

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const mod = {
	id   : 'title-tags',
	name : 'Title Tags',
	docs : {
		description : 'Ensures that all &lt;a&gt; tags have a [title] attribute',
		category    : 'Accessibility'
	},
	messaging : {
		success  : 'All your <a> tags include the [title] attribute',
		fail     : '<a> tags were found without the [title] attribute',
		howtofix : ''
	},
	context      : 'HTML',
	output       : {
		type  : 'array',
		value : ''
	},
	failed : false,
	test(ctx) {

		// variables should be defined here
		const $body = ctx.get('DOMTree')
		var output = [];

		//----------------------------------------------------------------------
		// Helpers
		//----------------------------------------------------------------------

		// any helper functions should go here or else delete this section

		//----------------------------------------------------------------------
		// Public
		//----------------------------------------------------------------------

		$body.find('a:not([title])').each((i, item) => {
			output.push( $.html(item).trim() );
		})

		mod.output.value = output
		mod.failed = !! output.length

		return mod
	}
}

module.exports = mod
