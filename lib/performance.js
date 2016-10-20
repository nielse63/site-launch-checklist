
const curl = require('curlrequest');
const _ = require('lodash');

class Performance {

	constructor() {
		this.defaults = {
			strategy : 'desktop',
			threshold : 85
		};
	}

	init(options, callback) {
		this.config = _.extend(this.defaults, options);

		var url = encodeURIComponent( this.config.url );
		var strategy = this.config.strategy;
		var get = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url=' + url + '&screenshot=false&strategy=' + strategy + '&key=AIzaSyBwB5pCLn_6i0QtDqqly_CmrO-Oe42daTg';
		curl.request(get, function(err, stdout) {
			if( err ) {
				callback(err);
				return;
			}
			callback(null, {
				pagespeed : JSON.parse( stdout )
			});
		});
	}
}

module.exports = new Performance();
