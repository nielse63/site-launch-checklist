
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
		type  : 'string',
		value : ''
	},
	failed : false,
	test(ctx) {

		// variables should be defined here
		const siteurl = ctx.get('url');
		const urlObject = url.parse(siteurl);
		const targetUrl = `${urlObject.protocol }//${ urlObject.host }/sitemap.xml`;

		//----------------------------------------------------------------------
		// Helpers
		//----------------------------------------------------------------------

		// any helper functions should go here or else delete this section
		function getFileContent() {
			return new Promise((resolve) => {
				shelljs.exec(`curl --no-keepalive ${ targetUrl}`, {
					async  : true,
					silent : true
				}, (code, stdout, stderr) => {
					if( code ) {
						return reject(`${code }: ${ stderr}`);
					}
					resolve(stdout);
				});
			})
		}

		//----------------------------------------------------------------------
		// Public
		//----------------------------------------------------------------------

		return new Promise((resolve, reject) => {
			utils.getHTTPCode(targetUrl).then((data) => {
				if( data.code > 199 && data.code < 400 ) {
					return getFileContent().then((content) => {
						mod.output.value = content.trim()
						resolve(mod);
					})
				}

				mod.failed = true
				resolve(mod)
			})
		}, (err) => {
			utils.error(err)
		});
	}
};

module.exports = mod
