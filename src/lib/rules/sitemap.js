
const url = require('url');
const request = require('request');
const shelljs = require('shelljs');

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
	// triggerEvent : 'change:siteurl',
	output       : {
		type  : '',
		value : ''
	},
	failed : false,
	test(ctx) {
		let urls = {
			home : ctx.get('siteurl'),
		};
		const urlObject = url.parse(urls.home);
		urls.sitemap = urlObject.protocol + '//' + urlObject.host + '/sitemap.xml';

		return new Promise((resolve, reject) => {
			// shelljs.exec('curl -I ' + urls.sitemap, {
			// 	async : true,
			// 	silent : true
			// }, (err, res, body) => {
			// 	if( err ) {
			// 		return reject(err);
			// 	}
			// 	console.log(res);
			// 	resolve('howdy');
			// });
			console.log('curl -I ' + urls.sitemap);
			resolve('howdy');
			// request.get(urls.sitemap, (err, res, body) => {
			// 	console.log(err);
			// 	if( err || res.statusCode !== 200 ) {
			// 		reject(err || res);
			// 	}
			// 	// console.log(body);
			// });
		}, (err) => {
			console.log('=> ERROR: ' + err)
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
