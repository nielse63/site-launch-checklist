
const shelljs = require('shelljs')

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const mod = {
	id   : 'pagespeed',
	name : 'PageSpeed',
	docs : {
		description : 'Evaluates site performance against Google Page Speed Insights',
		category    : 'Performance'
	},
	messaging : {
		success  : '',
		fail     : '',
		howtofix : ''
	},
	context : 'WordPress',
	output  : {
		type  : 'object',
		value : {}
	},
	failed : false,
	test(ctx) {

		// variables should be defined here
		const options = ctx.get('options')
		const url = encodeURIComponent( options.site.siteurl )
		const strategy = 'desktop';
		const get = `https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url=${ url }&screenshot=false&strategy=${ strategy }&key=AIzaSyBwB5pCLn_6i0QtDqqly_CmrO-Oe42daTg`

		//----------------------------------------------------------------------
		// Helpers
		//----------------------------------------------------------------------

		// any helper functions should go here or else delete this section

		//----------------------------------------------------------------------
		// Public
		//----------------------------------------------------------------------

		return new Promise((resolve) => {
			shelljs.exec('curl ' + get, {
				async : true,
				silent : true
			}, (code, stdout, stderr) => {
				let json = {}
				try {
					json = JSON.parse(stdout)
				} catch(e) {
					return reject('Unable to parse response')
				}

				// set output
				mod.output.value = json

				// handle errors
				if( json.error ) {
					mod.failed = true
					mod.output.value = json.error.message
					return resolve(mod)
				}

				const score = output.ruleGroups.SPEED.score
				if( score < 85 ) {
					mod.failed = true
				}

				resolve(mod)
			})
		})
	}
};

module.exports = mod
