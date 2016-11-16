
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
		howtofix : ''
	},
	context      : 'WordPress',
	// triggerEvent : 'change:plugins',
	output       : {
		type  : '',
		value : ''
	},
	test(ctx) {

		// variables should be defined here
		const plugins = ctx.get('plugins')

		//----------------------------------------------------------------------
		// Helpers
		//----------------------------------------------------------------------

		// any helper functions should go here or else delete this section

		//----------------------------------------------------------------------
		// Public
		//----------------------------------------------------------------------

		if( ! plugins || ! plugins.length ) {
			return []
		}
		return plugins
	}
};
