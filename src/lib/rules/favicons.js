
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
	id   : 'favicons',
	name : 'Favicons',
	docs : {
		description : 'Evaluates the sites use of favicons, browser-config, and manifest files',
		category    : 'General'
	},
	messaging : {
		success  : '',
		fail     : '',
		howtofix : ''
	},
	context      : 'HTML',
	// triggerEvent : 'change:DOMTree',
	output       : {
		type  : '',
		value : ''
	},
	failed : false,
	test(ctx) {

		// variables should be defined here

		//----------------------------------------------------------------------
		// Helpers
		//----------------------------------------------------------------------

		// any helper functions should go here or else delete this section

		//----------------------------------------------------------------------
		// Public
		//----------------------------------------------------------------------

		if( true ) {
			return true;
		}
		return false;
	}
	// test() {
	// 	if( json.env.ip_address === '127.0.0.1' ) {
	// 		utils.warn('!! Cannot validate favicons on a local server.');
	// 		return false;
	// 	}

	// 	const options = {
	// 		url     : `https://realfavicongenerator.p.mashape.com/favicon/analysis?site=${ encodeURIComponent( json.site.siteurl )}`,
	// 		headers : {
	// 			'X-Mashape-Key' : process.env.MASHAPE_KEY || 'f64a016361ce93bbcf34527549a23f13fa0eb72f',
	// 			'Accept'        : 'application/json'
	// 		}
	// 	};

	// 	const output = {};
	// 	// const object = {};
	// 	let passed = true;

	// 	return new Promise((resolve, reject) => {
	// 		request(options, (err, res, body) => {
	// 			if(err) {
	// 				return reject(err);
	// 			}

	// 			const _json = JSON.parse(body);
	// 			Object.keys(_json).forEach((key) => {
	// 				const messages = _json[key].messages;
	// 				output[key] = messages;
	// 				if( messages.no_icon || messages.error ) {
	// 					passed = false;
	// 				}
	// 			});

	// 			if( passed ) {
	// 				resolve(output);
	// 			} else {
	// 				reject(output);
	// 			}
	// 		});
	// 	});
	// },
	// format() {
	// 	const output = {};
	// 	for(const key in this.results) {
	// 		if( ! this.results.hasOwnProperty(key) ) {
	// 			continue;
	// 		}
	// 		const data = this.results[key];
	// 		const deviceArray = [];
	// 		for(const errorType in data) {
	// 			if( ! data.hasOwnProperty(errorType) ) {
	// 				continue;
	// 			}
	// 			const content = [];
	// 			let tag = '<p>';
	// 			if( errorType === 'no_icon' || errorType === 'error' ) {
	// 				tag = '<p class="icon-error">';
	// 			}
	// 			data[errorType].forEach((array) => {
	// 				content.push(`${tag + array[0] }</p>`);
	// 			});
	// 			deviceArray.push(content.join(''));
	// 		}
	// 		output[key] = deviceArray;
	// 	}
	// 	return {
	// 		name   : this.name,
	// 		values : output
	// 	};
	// }
};
