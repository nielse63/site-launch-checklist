
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
	id   : 'meta-tags',
	name : 'Meta Tags',
	docs : {
		description : 'Evaluates the site&#39;s meta tags for any errors or missing information',
		category    : 'SEO'
	},
	messaging : {
		success  : '',
		fail     : '',
		howtofix : ''
	},
	context      : 'HTML',
	// triggerEvent : 'change:DOMTree',
	output       : {
		type  : '',
		value : ''
	},
	failed : false,
	test(ctx) {

		// variables should be defined here

		//----------------------------------------------------------------------
		// Helpers
		//----------------------------------------------------------------------

		// any helper functions should go here or else delete this section

		//----------------------------------------------------------------------
		// Public
		//----------------------------------------------------------------------

		if( true ) {
			return true;
		}
		return false;
	}
	// test() {
	// 	const $meta = $('meta, link:not([href*=".css"])');
	// 	const output = {};
	// 	$meta.each((i, item) => {
	// 		const attrs = item.attribs;
	// 		let key = Object.keys(attrs)[0];

	// 		key = attrs.name || attrs.property || attrs.rel || key;
	// 		const content = attrs.hasOwnProperty('content') ? attrs.content :
	// 		attrs.hasOwnProperty('href') ? attrs.href : attrs[key];

	// 		if( output.hasOwnProperty(key) ) {
	// 			let old = output[key];
	// 			if( typeof old === 'string' ) {
	// 				old = [old];
	// 			}
	// 			output[key] = old;
	// 			output[key].push(content);
	// 		} else {
	// 			output[key] = content;
	// 		}
	// 	});
	// 	return output;
	// },
	// format() {
	// 	return [{
	// 		name   : this.name,
	// 		values : this.results
	// 	}];
	// }
};
