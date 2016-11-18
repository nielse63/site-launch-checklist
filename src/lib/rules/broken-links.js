
const url = require('url');
const $ = require('cheerio');
const utils = require('../utils');
const _ = require('lodash');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const mod = {
	id   : 'broken-links',
	name : 'Broken Links',
	docs : {
		description : 'Searches the homepage for broken links',
		category    : 'General'
	},
	messaging : {
		success  : 'No broken links were found',
		fail     : 'Broken links here found on the homepage: <%= links %>',
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
		const pageURL = ctx.get('url')
		const protocol = url.parse(pageURL).protocol;
		const host = url.parse(pageURL).host;
		const base = `${protocol }//${ host}`;
		const $body = ctx.get('DOMTree')
		const array = [];

		//----------------------------------------------------------------------
		// Helpers
		//----------------------------------------------------------------------

		function parseSrc(src) {
			if( src[0] === '/' && src[1] !== '/' ) {
				src = url.resolve(base, src);
			}
			return src;
		}

		//----------------------------------------------------------------------
		// Public
		//----------------------------------------------------------------------

		$body.find('a[href]:not([href^="#"])').each((i, item) => {
			const _href = $(item).attr('href');
			const urlObject = url.parse(_href);
			let href = `${urlObject.protocol }//${ urlObject.host }${urlObject.path}`
			href = parseSrc(href);
			if( array.indexOf(href) < 0 ) {
				array.push(href);
			}
		})

		return new Promise((resolve) => {
			const total = array.length;
			let count = 0;
			const output = {
				success : [],
				fail    : []
			}

			array.forEach((href) => {
				utils.getHTTPCode(href).then((res) => {
					if( res.code > 199 && res.code < 400 ) {
						output.success.push(res)
					} else {
						output.fail.push(res)
					}

					count++

					if( count === total ) {
						mod.output.value = output
						if( output.fail.length ) {
							mod.failed = true
							const links = output.fail.map((link) => {
								return `- ${ link}`
							}).join('\r\n')
							const compiled = _.template(mod.messaging.fail)
							mod.messaging.fail = compiled({
								links
							})
						}
						// resolve(mod);
					}
				})
			})
			resolve(mod)
		})
	}
}

module.exports = mod
