
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
			howtofix : 'Visit https://github.com/nielse63/launch-checklist for more information.'
		},
		context : '',
		output  : {
			type  : '',
			value : ''
		},
		// working : false,
		// results : null,
		test(ctx) {
			return ctx
		}
	},

	// backbone methods
	initialize() {
		// this.on('change:messaging', () => {
		// 	const messaging = this.get('messaging');
		// 	const defaults = this.defaults.messaging;
		// 	Object.keys( messaging ).forEach((key) => {
		// 		const value = messaging[key];
		// 		if( ! value ) {
		// 			messaging[key] = defaults[key];
		// 		}
		// 	})
		// 	this.set('messaging', messaging);
		// })
	}
});

// init and ship
module.exports = exports = Rule;
