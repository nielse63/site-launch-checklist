
const curl = require('curlrequest');
const _ = require('lodash');
const fs = require('fs');
const utils = require( './utils' );

class Ping {

	setConfig(options) {
		this.config = options;
	}

	post(url, data) {
		var options = {
			url : url,
			method : 'POST',
		};
		if( data ) {
			options.data = {
				data : JSON.stringify(data)
			};
		}

		curl.request(options, function(err, stdout, stderr) {
			if( err ) {
				utils.fail(err);
			}
			if( stderr ) {
				utils.warn(stderr);
			}
			utils.success(stdout);
		});
	}

	notify(what, data = null) {
		utils.success('Notifying server that we started');
		const url = 'http://localhost:8080/ping/' + what + '/' + encodeURIComponent(this.config.url);
		this.post(url, data);
	}

	submit(data) {
		utils.success('Submitting data to server');
		// const data = require('../test/results/data.json');
		const url = 'http://localhost:8080/submit/' + encodeURIComponent(this.config.url) + '/' + Date.now();
		this.post(url, data);
	}
}

module.exports = new Ping();
