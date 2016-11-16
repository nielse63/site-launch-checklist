
const validator = require('html-validator')

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const mod = {
	id   : 'valid-html',
	name : 'Valid HTML',
	docs : {
		description : 'Validates the output HTML, looking for any errors',
		category    : 'General'
	},
	messaging : {
		success  : 'Your HTML is valid.',
		fail     : 'The HTML failed to validate. See the results for more info.',
		howtofix : 'To see how your HTML is validated, please visit http://validator.w3.org/nu/about.html'
	},
	context : 'HTML',
	output  : {
		type  : 'object',
		value : {}
	},
	failed : false,
	test(ctx) {

		// variables should be defined here
		const html = ctx.get('HTML')
		const url = ctx.get('url')
		const options = {
			url,
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
				})
			};
		}

		//----------------------------------------------------------------------
		// Public
		//----------------------------------------------------------------------

		return new Promise((resolve, reject) => {
			validator(options, (err, _data) => {
				if (err) {
					reject( err )
				}
				const json = JSON.parse( _data );
				const data = filterResults( json.messages );

				mod.output.value = data;
				if( data.error.length ) {
					mod.failed = true
				}
				if( data.warning.length ) {
					mod.messaging.success = mod.messaging.success.replace('.', ', but there were a few warnings. See the data below for more details.')
				}

				resolve( mod );
			})
		})
	}
}

module.exports = mod;
