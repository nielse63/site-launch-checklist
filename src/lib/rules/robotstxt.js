
const shelljs = require('shelljs');
const url = require('url');
const utils = require('../utils');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const mod = {
	id   : 'robotstxt',
	name : 'Robots.txt',
	docs : {
		description : 'Returns the value of the robots.txt file (if one is found) for validation',
		category    : 'SEO'
	},
	messaging : {
		success  : 'Robots.txt file found successfully',
		fail     : 'No robots.txt file was found',
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
		const targetUrl = `${urlObject.protocol }//${ urlObject.host }/robots.txt`;

		//----------------------------------------------------------------------
		// Helpers
		//----------------------------------------------------------------------

		// any helper functions should go here or else delete this section
		function getFileContent() {
			return new Promise((resolve, reject) => {
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

		return new Promise((resolve) => {
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
