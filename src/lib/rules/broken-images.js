
var async = require('async');
var request = require('request');
var url = require('url');
var $ = require('cheerio');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
	id   : 'broken-images',
	name : 'Broken Images',
	docs : {
		description : 'Ensures that there are no broken images on the site',
		category    : 'General'
	},
	messaging : {
		success  : 'No broken images were found',
		fail     : 'Several broken images were found on the site',
		howtofix : ''
	},
	context      : 'HTML',
	// triggerEvent : 'change:DOMTree',
	output       : {
		type  : '',
		value : ''
	},
	test(ctx) {

		// variables should be defined here
		const pageURL = ctx.get('url')
		const protocol = url.parse(pageURL).protocol;
		const $body = ctx.get('DOMTree')
		var array = [];
		$body.find('img[src]').each((i, item) => {
			array.push( $(item).attr('src') );
		})

		var queue = async.queue((src, callback) => {
			request.get(src, (err, res, body) => {
				if( err ) {
					return callback(err, src);
				}
				callback(null, src);
			});
		}, 10);

		// variables should be defined here

		//----------------------------------------------------------------------
		// Helpers
		//----------------------------------------------------------------------

		function parseSrc(src) {
			src = src.split('?')[0];
			if( src.indexOf('//') === 0 ) {
				src = src.replace(/\/\//, '');
				src = protocol + '//' + src;
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
