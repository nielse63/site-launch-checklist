

"use strict";

var path = require('path');
var fs = require('fs');
var WP = require('wp-cli');
var env = require('node-env-file');
var shell = require('shelljs');
var exec = require('child_process').exec;

env(path.dirname(__dirname) + '/.env');

var commands = {
	wp : path.dirname(__dirname) + '/bin/wp',
	about : path.dirname(__dirname) + '/bin/commands/about/about.php'
};

class WordPress {
	constructor() {
		this.docroot = this._getConfig();
		this.wp_config = path.join( this.docroot, 'wp-config.php' );
		// this.php = this._getPHP();
	}

	_getConfig() {

		// dev testing
		if( process.env.NODE_ENV === 'development' ) {
			return '/Users/eriknielsen/Sites/riverline-staging.dev';
		}

		var pathArray = __dirname.split('/');
		var configPath = '';
		pathArray.forEach(function(part, i) {
			var _path = pathArray.join('/');
			var _configPath = path.join( _path, 'wp-config.php' );
			if( fs.existsSync(_configPath) ) {
				configPath = _path;
				return false;
			}
			pathArray.pop();
		});
		return configPath;
	}

	_getPHP() {
		var mamp = '/Applications/MAMP/bin/php';
		if( fs.existsSync( mamp ) ) {
			var latest = exec('ls "' + mamp + '" | sort -n | tail -1', {silent:true}).stdout;
			return '/Applications/MAMP/bin/php/' + latest.trim() + '/bin/php';
		}
		return shell.which('php');
	}

	init() {
		commands.wp += ' --path=' + this.docroot;

		this.getSiteInfo();
	}

	getSiteInfo() {

		var cmd = commands.wp + ' about';
		var _this = this;
		// console.log(cmd);
		exec(cmd, (error, stdout, stderr) => {
			if (error) {
				console.error(`exec error: ${error}`);
				return;
			}

			if( stdout ) {
				// console.log(`stdout:\n${stdout}`);
				var data = stdout.trim();
				_this.about = {
					string : data,
				};
			}

			if( stderr ) {
				console.log(`stderr:\n${stderr}`);
			}
		});
	}

	getPluginInfo() {

		var cmd = commands.wp + ' plugin list';
		var _this = this;
		// console.log(cmd);
		exec(cmd, (error, stdout, stderr) => {
			if (error) {
				console.error(`exec error: ${error}`);
				return;
			}

			if( stdout ) {
				// console.log(`stdout:\n${stdout}`);
				var data = stdout.trim();
				_this.plugins = {
					string : data,
				};
			}

			if( stderr ) {
				console.log(`stderr:\n${stderr}`);
			}
		});
	}
}

module.exports = new WordPress();
