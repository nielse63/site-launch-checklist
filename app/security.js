
const curl = require('curlrequest');
const _ = require('lodash');
const path = require('path');
const exec = require('child_process').exec;

const cwd = path.dirname( __dirname );

class Security {

	constructor() {
		this.defaults = {
			url : ''
		};
	}

	init(options, callback) {
		this.config = _.extend(this.defaults, options);

		this.commands = {
			wp : path.join(cwd, '/bin/wp') + ' --path=' + this.config.docroot
		};

		this.getSecurityConfig().then(function(data) {
			callback(null, data);
		}, function(err) {
			callback(err);
		});
	}

	getSecurityConfig() {
		var cmd = [this.commands.wp, 'wp-security'].join(' ');
		return new Promise(function(resolve, reject) {
			exec(cmd, (err, stdout, stderr) => {
				if (err) return reject(err);

				resolve(stdout);
			});
		});
	}
}

module.exports = new Security();
