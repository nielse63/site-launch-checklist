
var $ = require('cheerio')

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
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
	// triggerEvent : 'change:DOMTree',
	output       : {
		type  : '',
		value : ''
	},
	test(ctx) {

		// variables should be defined here
		const $body = ctx.get('DOMTree')
		var output = [];
		$body.find('a:not([title])').each((i, item) => {
			output.push( $.html(item).trim() );
		})

		//----------------------------------------------------------------------
		// Helpers
		//----------------------------------------------------------------------

		// any helper functions should go here or else delete this section

		//----------------------------------------------------------------------
		// Public
		//----------------------------------------------------------------------

		if( ! output.length ) {
			return true;
		}
		return output;
	}
};
