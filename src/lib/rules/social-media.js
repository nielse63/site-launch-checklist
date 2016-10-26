
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
	id   : 'social-media',
	name : 'Social Media',
	docs : {
		description : 'Ensures that any links to social media sites aren&#39;t defaulting to homepage',
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
	// 	const links = [
	// 		'facebook.com',
	// 		'twitter.com',
	// 		'instagram.com',
	// 		'youtube.com',
	// 		'linkedin.com'
	// 	];
	// 	const output = [];
	// 	links.forEach((link) => {
	// 		const $links = $(`a[href*="${ link }"]`);
	// 		if( ! $links.length ) {
	// 			return;
	// 		}
	// 		$links.each((i, element) => {
	// 			const href = $(element).attr('href');
	// 			if( output.indexOf(href) < 0 ) {
	// 				output.push( $(element).attr('href') );
	// 			}
	// 		});
	// 	});
	// 	return output;
	// },
	// format() {
	// 	return {
	// 		name   : this.name,
	// 		values : this.results
	// 	};
	// }
};
