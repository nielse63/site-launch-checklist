
const url = require('url');
const $ = require('cheerio');
const utils = require('../utils');
const _ = require('lodash');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const mod = {
	id   : 'broken-images',
	name : 'Broken Images',
	docs : {
		description : 'Searches the homepage for broken images',
		category    : 'General'
	},
	messaging : {
		success  : 'No broken images were found',
		fail     : 'Broken images here found on the homepage: <%= images %>',
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
		const $body = ctx.get('DOMTree')
		const array = [];

		//----------------------------------------------------------------------
		// Helpers
		//----------------------------------------------------------------------

		function parseSrc(src) {
			src = src.split('?')[0];
			if( src.indexOf('//') === 0 ) {
				src = src.replace(/\/\//, '');
				src = `${protocol }//${ src}`;
			}
			return src;
		}

		//----------------------------------------------------------------------
		// Public
		//----------------------------------------------------------------------

		$body.find('img[src]').each((i, item) => {
			const _src = $(item).attr('src');
			const urlObject = url.parse(_src);
			let src = `${urlObject.protocol }//${ urlObject.host }${urlObject.path}`
			src = parseSrc(src);
			if( array.indexOf(src) < 0 ) {
				array.push(src);
			}
		})

		return new Promise((resolve) => {
			const total = array.length;
			let count = 0;
			const output = {
				success : [],
				fail    : []
			};

			array.forEach((src) => {
				utils.getHTTPCode(src).then((res) => {
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
							const images = output.fail.map((link) => {
								return `- ${ link}`
							}).join('\r\n')
							const compiled = _.template(mod.messaging.fail)
							mod.messaging.fail = compiled({
								images
							})
						}
						resolve(mod);
					}
				})
			});
		});
	}
};

module.exports = mod
