
var validator = require('html-validator')

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
	id   : 'valid-html',
	name : 'Valid HTML',
	docs : {
		description : 'Validates the output HTML, looking for any errors',
		category    : 'General'
	},
	messaging : {
		success  : 'Your HTML is valid.',
		fail     : 'The HTML provided failed to validate. See the results for more info.',
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
		const html = model.get('HTML')
		const url = model.get('page_url')

		var options = {
			url: url,
			data : html
		};


		//----------------------------------------------------------------------
		// Helpers
		//----------------------------------------------------------------------

		function filterResults(array) {
			return {
				error : array.filter((object) => {
					return object.type === 'error';
				}),
				warning : array.filter((object) => {
					return object.subType === 'warning';
				}),
				other : array.filter((object) => {
					return object.type !== 'error' && object.subType !== 'warning';
				}),
			};
		}

		//----------------------------------------------------------------------
		// Public
		//----------------------------------------------------------------------

		return new Promise((resolve, reject) => {
			validator(options, function (err, data) {
				if (err) {
					reject( err )
				}
				var json =  JSON.parse( data );
				var data = filterResults( json.messages );

				if( data.error.length ) {
					return reject( data );
				}
				resolve( data );
			})
		})
	}
};
