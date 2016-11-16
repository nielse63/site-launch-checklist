
var url = require('url');
var request = require('request');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
	id   : 'xml-sitemap',
	name : 'XML Sitemap',
	docs : {
		description : 'Looks for an xml sitemap, and creates one if none is found',
		category    : 'SEO'
	},
	messaging : {
		success  : 'A valid xml sitemap was found',
		fail     : 'Unable not find a valid xml sitemap',
		howtofix : ''
	},
	context      : 'WordPress',
	// triggerEvent : 'change:siteurl',
	output       : {
		type  : '',
		value : ''
	},
	failed : false,
	test(ctx) {

		var urls = {
			home : ctx.get('siteurl'),
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
