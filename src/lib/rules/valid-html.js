
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
};
