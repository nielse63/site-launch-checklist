
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
	id   : 'title-tags',
	name : 'Title Tags',
	docs : {
		description : 'Ensures that all &lt;a&gt; tags have a [title] attribute',
		category    : 'Accessibility'
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
