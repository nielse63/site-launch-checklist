
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
	id   : '<%- id %>',
	name : '<%- name %>',
	docs : {
		description : '<%- description %>',
		category    : '<%- category %>'
	},
	messaging : {
		success  : '',
		fail     : '',
		warning  : '',
		error    : '',
		howtofix : ''
	},
	context : '<%- context %>',
	output  : {
		type  : '',
		value : ''
	},
	test(data) {

		// variables should be defined here

		//----------------------------------------------------------------------
		// Helpers
		//----------------------------------------------------------------------

		// any helper functions should go here or else delete this section

		//----------------------------------------------------------------------
		// Public
		//----------------------------------------------------------------------

		if( data ) {
			return true;
		}
	}
};
