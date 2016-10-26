
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
	id   : 'robotstxt',
	name : 'Robots.txt',
	docs : {
		description : 'Returns the value of the robots.txt file (if one is found) for validation',
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
	// 	const get = url.resolve(json.site.siteurl, 'robots.txt');
	// 	return new Promise((resolve, reject) => {
	// 		request(get, (err, res, body) => {
	// 			if( err ) {
	// 				reject(err);
	// 				return;
	// 			}
	// 			if( res.statusCode !== 200 ) {
	// 				reject('robots.txt not found.');
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
