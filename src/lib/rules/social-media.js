
const $ = require('cheerio')
const url = require('url')

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const mod = {
	id   : 'social-media',
	name : 'Social Media',
	docs : {
		description : 'Ensures that any links to social media sites aren&#39;t defaulting to homepage',
		category    : 'General'
	},
	messaging : {
		success  : 'All social media links are valid',
		fail     : 'Some social media links are pointing to the incorrect URL.',
		howtofix : ''
	},
	context : 'HTML',
	output  : {
		type  : 'object',
		value : {}
	},
	failed : false,
	test(ctx) {

		// variables should be defined here
		const links = [
			'facebook.com',
			'twitter.com',
			'instagram.com',
			'youtube.com',
			'linkedin.com'
		];
		const selector = links.map((link) => {
			return `a[href*="${ link }"]`
		}).join(', ')
		const $body = ctx.get('DOMTree')

		//----------------------------------------------------------------------
		// Helpers
		//----------------------------------------------------------------------

		// any helper functions should go here or else delete this section

		//----------------------------------------------------------------------
		// Public
		//----------------------------------------------------------------------

		let tmpArray = [];
		$body.find(selector).each((i, item) => {
			const href = $(item).attr('href');
			const matches = links.filter((link) => {
				return href.indexOf( link ) > -1;
			})
			if( matches.length ) {
				tmpArray = tmpArray.concat(href);
			}
		})
		const output = {
			error : tmpArray.filter((href) => {
				return ! url.parse(href).path || url.parse(href).path === '/';
			}),
			success : tmpArray.filter((href) => {
				return url.parse(href).path && url.parse(href).path !== '/';
			})
		}

		// set output data
		mod.output.value = output
		mod.failed = !! output.error.length

		return mod;
	}
}

module.exports = mod
