
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
	id   : 'broken-links',
	name : 'Broken Links',
	docs : {
		description : 'Searches the homepage for broken links',
		category    : 'SEO'
	},
	messaging : {
		success  : '',
		fail     : '',
		warning  : '',
		error    : '',
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
	// 	function fetchLinks(callback) {

	// 		const _site = site.toJSON();
	// 		const output = [];
	// 		let hasBroken = false;
	// 		const htmlChecker = new blc.HtmlChecker({
	// 			filterLevel          : 0,
	// 			honorRobotExclusions : false
	// 		}, {
	// 			link(result){
	// 				const object = {
	// 					broken : false,
	// 					status : result.http.response.statusCode,
	// 					url    : result.url.original
	// 				};

	// 				if (result.broken) {
	// 					object.broken = true
	// 					hasBroken = true
	// 					object.status = blc[result.brokenReason];
	// 				} else if (result.excluded) {
	// 					object.broken = true
	// 					hasBroken = true
	// 					object.status = blc[result.excludedReason];
	// 				}

	// 				output.push(object);

	// 				if( ! htmlChecker.numQueuedLinks() ) {
	// 					return callback(output, hasBroken);
	// 				}
	// 			},
	// 			complete() {
	// 				callback(output, hasBroken)
	// 			}
	// 		});

	// 		htmlChecker.scan(_site.html.raw, _site.baseurl);
	// 	}
	// 	return new Promise((resolve, reject) => {
	// 		fetchLinks((data, hasBroken) => {
	// 			if( hasBroken ) {
	// 				return reject(data);
	// 			}
	// 			resolve(data);
	// 		})
	// 	}).catch((err) => {
	// 		utils.error(err);
	// 	});
	// },
	// format() {
	// 	return [{
	// 		headers : {
	// 			url    : 'URL',
	// 			broken : 'Broken',
	// 			status : 'Status Code'
	// 		},
	// 		values : this.results
	// 	}];
	// }
};
