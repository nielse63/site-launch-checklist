
const shelljs = require('shelljs');
const url = require('url');
const utils = require('../utils');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const mod = {
	id   : 'sitemap',
	name : 'Sitemap',
	docs : {
		description : 'Looks for an html sitemap page.',
		category    : 'SEO'
	},
	messaging : {
		success  : 'A valid html sitemap was found',
		fail     : 'Unable not find a valid html sitemap',
		howtofix : ''
	},
	context : 'WordPress',
	output  : {
		type  : '',
		value : ''
	},
	failed : false,
	test(ctx) {

		// variables should be defined here
		const siteurl = ctx.get('url');
		const urlObject = url.parse(siteurl);
		const sitemap = `${urlObject.protocol }//${ urlObject.host }/sitemap.xml`;

		//----------------------------------------------------------------------
		// Helpers
		//----------------------------------------------------------------------

		// any helper functions should go here or else delete this section

		//----------------------------------------------------------------------
		// Public
		//----------------------------------------------------------------------

		return new Promise((resolve, reject) => {
			shelljs.exec(`curl -I --no-keepalive ${ sitemap}`, {
				async  : true,
				silent : true
			}, (code, stdout, stderr) => {
				if( code ) {
					return reject(`${code }: ${ stderr}`);
				}
				resolve(mod);
			});
		}, (err) => {
			utils.error(err)
		});
	}
};

module.exports = mod
