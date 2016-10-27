
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
	id   : 'server-security-settings',
	name : 'Server Security Settings',
	docs : {
		description : 'Evaluates the server&#39;s security settings',
		category    : 'Security'
	},
	messaging : {
		success  : '',
		fail     : '',
		howtofix : ''
	},
	context      : 'Server',
	triggerEvent : 'initialize',
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
	// 	return new Promise((resolve, reject) => {
	// 		request(siteurl, (err, res) => {
	// 			if(err) {
	// 				utils.error(err);
	// 				return;
	// 			}

	// 			let passed = true;
	// 			const headers = Object.keys(res.headers);
	// 			const shouldntHave = [
	// 				'server',
	// 				'x-pingback'
	// 			];

	// 			const shouldHave = [
	// 				'x-xss-protection',
	// 				'x-frame-options'
	// 			];

	// 			shouldntHave.forEach((value) => {
	// 				if( headers.indexOf(value) > -1 ) {
	// 					passed = false;
	// 				}
	// 			});
	// 			if( passed ) {
	// 				shouldHave.forEach((value) => {
	// 					if( headers.indexOf(value) > -1 ) {
	// 						passed = false;
	// 					}
	// 				});
	// 			}

	// 			if( passed ) {
	// 				resolve(res.headers);
	// 			} else {
	// 				reject(res.headers);
	// 			}
	// 		});
	// 	});
	// }
};
