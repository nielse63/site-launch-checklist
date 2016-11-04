
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
	id   : 'pagespeed',
	name : 'PageSpeed',
	docs : {
		description : 'Evaluates site performance against Google Page Speed Insights',
		category    : 'Performance'
	},
	messaging : {
		success  : '',
		fail     : '',
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
	// 	const json = site.toJSON();

	// 	if( json.env.ip_address === '127.0.0.1' ) {
	// 		utils.warn('!! Cannot check page speed of a local server.');
	// 		return false;
	// 	}

	// 	const url = encodeURIComponent( json.site.siteurl );
	// 	const strategy = 'desktop';
	// 	const get = `https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url=${ url }&screenshot=false&strategy=${ strategy }&key=AIzaSyBwB5pCLn_6i0QtDqqly_CmrO-Oe42daTg`;
	// 	return new Promise((resolve, reject) => {
	// 		curl.request(get, (err, stdout) => {
	// 			if( err ) {
	// 				return reject(err);
	// 			}

	// 			const output = JSON.parse(stdout);
	// 			if( output.error ) {
	// 				return reject( output.error.message );
	// 			}

	// 			const score = output.ruleGroups.SPEED.score;
	// 			if( score < 85 ) {
	// 				return reject( output );
	// 			}

	// 			resolve( output );
	// 		});
	// 	});
	// }
};