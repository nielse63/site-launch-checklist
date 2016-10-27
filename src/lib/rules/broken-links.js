
var async = require('async');
var request = require('request');
var url = require('url');
var $ = require('cheerio');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
	id   : 'broken-links',
	name : 'Broken Links',
	docs : {
		description : 'Searches the homepage for broken links',
		category    : 'General'
	},
	messaging : {
		success  : 'No broken links were found',
		fail     : 'Several broken links were found on the site',
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
		const pageURL = model.get('page_url')
		const protocol = url.parse(pageURL).protocol;
		const hostname = url.parse(pageURL).hostname;
		const base = protocol + '//' + hostname;
		const $body = model.get('DOMTree')
		var array = [];
		$body.find('a[href]:not([href^="#"])').each((i, item) => {
			array.push( $(item).attr('href') );
		})

		var queue = async.queue((src, callback) => {
			request.get(src, (err, res, body) => {
				if( err ) {
					return callback(err, src);
				}
				callback(null, src);
			});
		}, 20);

		// variables should be defined here

		//----------------------------------------------------------------------
		// Helpers
		//----------------------------------------------------------------------

		function parseSrc(src) {
			if( src.indexOf('/') === 0 ) {
				src = url.resolve(base, src);
			}
			return src;
		}

		//----------------------------------------------------------------------
		// Public
		//----------------------------------------------------------------------

		return new Promise((resolve, reject) => {
			var total = array.length;
			var count = 0;
			var output = {
				success : [],
				fail : []
			};

			array.forEach((src) => {
				src = parseSrc(src);
				queue.push(src, (err, data) => {
					count++;

					var method = err ? output.fail : output.success;
					method.push( src );

					if( count === total ) {
						if( output.fail.length ) {
							return reject( output );
						}
						resolve( output );
					}
				})
			});
		});
	}
};
