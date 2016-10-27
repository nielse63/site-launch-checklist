
var $ = require('cheerio')

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
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
	triggerEvent : 'change:DOMTree',
	output       : {
		type  : '',
		value : ''
	},
	test(model) {

		// variables should be defined here
		const $body = model.get('DOMTree')
		var output = [];
		$body.find('img:not([alt])').each((i, item) => {
			output.push( $.html(item).trim() );
		})

		// variables should be defined here

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
