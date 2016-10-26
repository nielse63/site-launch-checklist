
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
	id   : 'sitemap',
	name : 'Sitemap',
	docs : {
		description : 'Looks for a sitemap, and creates one if none is found',
		category    : 'SEO'
	},
	messaging : {
		success  : '',
		fail     : '',
		warning  : '',
		error    : '',
		howtofix : ''
	},
	context      : 'WordPress',
	triggerEvent : 'change:siteurl',
	output       : {
		type  : '',
		value : ''
	},
	test(model) {

		// variables should be defined here

		//----------------------------------------------------------------------
		// Helpers
		//----------------------------------------------------------------------

		// any helper functions should go here or else delete this section

		//----------------------------------------------------------------------
		// Public
		//----------------------------------------------------------------------

		if( model ) {
			return true;
		}
		return false;
	}
	// test() {
	// 	const get = url.resolve(json.site.siteurl, 'sitemap.xml');
	// 	return new Promise((resolve, reject) => {
	// 		request(get, (err, res, body) => {
	// 			if( err ) {
	// 				reject(err);
	// 				return;
	// 			}
	// 			if( res.statusCode !== 200 ) {
	// 				reject('sitemap.xml not found.');
	// 				return;
	// 			}
	// 			resolve(body.trim());
	// 		});
	// 	});
	// },
	// format() {
	// 	return {
	// 		name   : this.name,
	// 		values : `<pre>${ this.results }</pre>`
	// 	}
	// }
};
