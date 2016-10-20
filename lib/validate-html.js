
const _ = require('lodash');
var validator = require('html-validator');

class ValidateHTML {

	constructor() {
		this.defaults = {};
	}

	init(options, callback) {
		this.config = _.extend(this.defaults, options);

		validator({
			url: this.config.url,
			format: 'json'
		}, function(err, data) {
			if (err) {
				return callback(err);
			}

			callback(null, data);
		});
	}
}

module.exports = new ValidateHTML();
