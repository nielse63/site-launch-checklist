
var url = require('url');
var request = require('request');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
	id   : 'sitemap',
	name : 'Sitemap',
	docs : {
		description : 'Looks for an html sitemap page.',
		category    : 'SEO'
	},
	messaging : {
		success  : 'A valid html sitemap was found',
		fail     : 'Unable not find a valid html sitemap',
		howtofix : ''
	},
	context      : 'WordPress',
	triggerEvent : 'change:siteurl',
	output       : {
		type  : '',
		value : ''
	},
	test(model) {

		var urls = {
			home : model.get('siteurl'),
		};
		var urlObject = url.parse(urls.home);
		urls.sitemap = urlObject.hostname + '/sitemap.xml';

		return new Promise((resolve, reject) => {
			request.get(urls.sitemap, (err, res, body) => {
				if( err || res.statusCode !== 200 ) {
					reject(err || res);
				}
				console.log(body);
			});
		});

		// variables should be defined here

		//----------------------------------------------------------------------
		// Helpers
		//----------------------------------------------------------------------

		// any helper functions should go here or else delete this section

		//----------------------------------------------------------------------
		// Public
		//----------------------------------------------------------------------
	}
};
