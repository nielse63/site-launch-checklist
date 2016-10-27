
const BackBone = require('backbone');

const Rule = BackBone.Model.extend({

	// default values
	defaults : {
		id   : '',
		name : '',
		docs : {
			description : '',
			category    : ''
		},
		messaging : {
			success  : 'The test passed successfully',
			fail     : 'The test failed',
			warning  : 'A warning was thrown',
			error    : 'An error was thrown',
			howtofix : 'Visit https://github.com/nielse63/launch-checklist for more information.'
		},
		context : '',
		output  : {
			type  : '',
			value : ''
		},
		// working : false,
		results : null,
		test(input, callback) {
			if( ! input ) {
				return callback('No data input to test', null, input);
			}

			const dataOut = Object.create(input);
			return callback(null, dataOut, input);
		}
	},

	// backbone methods
	initialize() {
		this.on('change:messaging', () => {
			var messaging = this.get('messaging');
			var defaults = this.defaults.messaging;
			Object.keys( messaging ).forEach((key) => {
				var value = messaging[key];
				if( ! value ) {
					messaging[key] = defaults[key];
				}
			})
			this.set('messaging', messaging);
		})
	}
});

// init and ship
module.exports = exports = Rule;
