

// modules
const async = require("async");
const path = require('path');
const fs = require('fs');
const env = require('node-env-file');
const exec = require('child_process').exec;
const _ = require( 'lodash' );

// vars
const cwd = path.dirname( __dirname );
const envFile = path.join( cwd, '/.env' );

class WordPress {
	constructor() {

		// set the environment
		if( fs.existsSync( envFile ) ) {
			env( envFile );
		}

		this.defaults = {
			docroot : '',
		};

		this.commands = {
			wp : path.join(cwd, '/bin/wp')
		};
	}

	_getDocRoot() {

		// dev testing
		console.log(process.env.WP_ROOT);
		if( process.env.NODE_ENV === 'development' && process.env.WP_ROOT ) {
			return process.env.WP_ROOT;
		}

		var pathArray = __dirname.split('/');
		var configPath = '';
		pathArray.forEach(function() {
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
					return reject(err);
				}

				// end execution
				let output = _this.formatOutput( results );
				output.site_info.docroot = _this.config.docroot;

				// dev env
				if( process.env.NODE_ENV === 'development' && process.env.WP_URL ) {
					output.site_info.siteurl = process.env.WP_URL;
				}

				// resolve
				resolve( output );
			});
		});
	}

	runWPCLI(args) {
		/* TODO: Handle errors */
		var cmd = [this.commands.wp, args].join(' ');

		return new Promise(function(resolve, reject) {
			exec(cmd, (err, stdout) => {
				if (err) {
					return reject(err);
				}

				resolve(stdout.trim());
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
				plugins : JSON.parse(data)
			});
		}, function(err) {
			callback(err);
		});
	}

	formatOutput(array) {
		let output = {};
		array.forEach(function(object) {
			for( const key in object ) {
				output[key] = object[key];
			}
		});
		return output;
	}
}

module.exports = new WordPress();
