
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
	id   : 'back-links',
	name : 'Back Links',
	docs : {
		description : 'Looks for a link back to the creators homepage',
		category    : 'General'
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
	// 	return $('[href*="cliquestudios.com"]').length && $('[href*="cliquestudios.com"]').attr('href');
	// },
	// format() {
	// 	return {
	// 		name   : this.name,
	// 		values : this.results
	// 	};
	// }
};
