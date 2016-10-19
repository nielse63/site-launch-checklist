

"use strict";

// modules
const async = require("async");
const path = require('path');
const fs = require('fs');
const WP = require('wp-cli');
const env = require('node-env-file');
const shell = require('shelljs');
const exec = require('child_process').exec;
const _ = require( 'lodash' );

// vars
const cwd = path.dirname( __dirname );
const envFile = path.join( cwd, '/.env' );

class WordPress {
	constructor() {

		// set the environment
		if( fs.existsSync( envFile ) ) {
			env( path.join(cwd, '/.env') );
		}

		// this.docroot = this._getConfig();
		// this.wp_config = path.join( this.docroot, 'wp-config.php' );
		this.defaults = {
			docroot : '',
		};

		this.commands = {
			wp : path.join(cwd, '/bin/wp'),
			about : path.join(cwd, '/bin/commands/about/about.php')
		};
	}

	_getDocRoot() {

		// dev testing
		if( process.env.NODE_ENV === 'development' && process.env.WP_ROOT ) {
			return process.env.WP_ROOT;
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

	init( options ) {
		this.config = _.extend(this.defaults, options);
		var _this = this;

		return new Promise(function(resolve, reject) {
			if( ! _this.config.docroot ) {
				_this.config.docroot = _this._getDocRoot();

				if( ! _this.config.docroot ) {
					reject('No doc root give and none found.');
					return;
				}
			}

			// setup commands
			_this.commands.wp += ' --path=' + _this.config.docroot;

			// run methods
			async.parallel([
				function(callback) {
					_this.getSiteInfo(callback);
				},
				function(callback) {
					_this.getServerInfo(callback);
				},
				function(callback) {
					_this.getPluginInfo(callback);
				},
			], function(err, results) {
				if( err ) {
					console.error(results);
					// throw err;
					return;
				}
				resolve(results);
			});
		});
	}

	runWPCLI(args) {
		var cmd = [this.commands.wp, args].join(' ');

		return new Promise(function(resolve, reject) {
			exec(cmd, (error, stdout, stderr) => {
				if (error) {
					console.error(`exec error: ${error}`);
					return;
				}

				if( stdout ) {
					resolve(stdout.trim());
					return
				}

				reject( stderr );
			});
		});
	}

	getSiteInfo(callback) {
		var keys = ['siteurl', 'blogname', 'admin_email'];
		var _this = this;
		var i = 0;
		var output = {};
		keys.forEach(function(key) {
			_this.runWPCLI('option get ' + key).then(function(data) {
				output[key] = data;
				i++;
				if( i === keys.length ) {
					callback(null, {
						site_info : output
					});
				}
			}, function(err) {
				callback(err);
			});
		});
	}

	getServerInfo(callback) {
		this.runWPCLI('about').then(function(data) {
			callback(null, {
				server_info : JSON.parse(data)
			});
		}, function(err) {
			callback(err);
		});
	}

	getPluginInfo(callback) {
		this.runWPCLI('plugin list --format=json').then(function(data) {
			callback(null, {
				plugin_data : JSON.parse(data)
			});
		}, function(err) {
			callback(err);
		});
	}
}

module.exports = new WordPress();
