
var gtmetrix = require ('gtmetrix') ({
	email: 'erik@312development.com',
	apikey: '49d86806d50bc81286efffaefacd35c9',
	timeout: 15000
});

class SEO {

	constructor() {
		this.URL = 'http://staging.riverline.sandbox3.cliquedomains.com/';
	}

	getTest(id, callback) {
		var _this = this;
		gtmetrix.test.get(id, function(err, results) {
			if( err || results.state === 'error' ) {
				callback(err, results);
				return;
			}

			console.log(results.state);
			if( results.state !== 'completed' ) {
				setTimeout(function() {
					_this.getTest(id, callback);
				}, 1000);
			} else {
				callback(null, results);
			}
		});
	}

	init(options, callback) {
		var test = {
			url: options.url,
			location: 2,
			browser: 3
		};
		var _this = this;
		gtmetrix.test.create(test, function(err, data) {
			if (err) { return console.log (err); }

			// get test results
			_this.getTest(data.test_id, callback);
		});
	}
}

module.exports = new SEO();
