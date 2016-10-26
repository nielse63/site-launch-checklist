
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
	id   : 'wordpress-plugins',
	name : 'WordPress Plugins',
	docs : {
		description : 'Compiles a list of WordPress plugins being used on the site for evaluation',
		category    : 'General'
	},
	messaging : {
		success  : '',
		fail     : '',
		warning  : '',
		error    : '',
		howtofix : ''
	},
	context      : 'WordPress',
	triggerEvent : 'change:plugins',
	output       : {
		type  : '',
		value : ''
	},
	test(model) {

		//----------------------------------------------------------------------
		// Helpers
		//----------------------------------------------------------------------

		// any helper functions should go here or else delete this section

		//----------------------------------------------------------------------
		// Public
		//----------------------------------------------------------------------

		return new Promise((resolve, reject) => {
			var plugins = model.get('plugins')
			if( ! plugins || ! plugins.length ) {
				return reject('No plugins are installed')
			}
			resolve(plugins);
		});
	}
};
