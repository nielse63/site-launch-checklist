
var $ = require('cheerio')
var url = require('url')

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
	id   : 'social-media',
	name : 'Social Media',
	docs : {
		description : 'Ensures that any links to social media sites aren&#39;t defaulting to homepage',
		category    : 'General'
	},
	messaging : {
		success  : 'All social media links are valid',
		fail     : 'Some social media links are pointing to the incorrect URL.',
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
		const links = [
			'facebook.com',
			'twitter.com',
			'instagram.com',
			'youtube.com',
			'linkedin.com'
		];
		const $body = model.get('DOMTree')
		var tmpArray = [];
		$body.find('a[href]').each((i, item) => {
			var href = $(item).attr('href');
			var matches = links.filter((link) => {
				return href.indexOf( link ) > -1;
			})
			if( matches.length ) {
				tmpArray = tmpArray.concat(href);
			}
		})
		var output = {
			error : tmpArray.filter((href) => {
				return ! url.parse(href).path || url.parse(href).path === '/';
			}),
			success : tmpArray.filter((href) => {
				return url.parse(href).path && url.parse(href).path !== '/';
			})
		};

		//----------------------------------------------------------------------
		// Helpers
		//----------------------------------------------------------------------

		// any helper functions should go here or else delete this section

		//----------------------------------------------------------------------
		// Public
		//----------------------------------------------------------------------

		if( output.error.length ) {
			return output;
		}
		return true;
	}
};
