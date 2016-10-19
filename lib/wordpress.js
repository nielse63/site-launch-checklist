

"use strict";

// modules
var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var async = require("async");
var path = require('path');
var fs = require('fs');
var WP = require('wp-cli');
var env = require('node-env-file');
var shell = require('shelljs');
var exec = require('child_process').exec;
var _ = require('lodash');

// vars
var cwd = path.dirname(__dirname);
var envFile = path.join(cwd, '/.env');var

WordPress = function () {
	function WordPress() {_classCallCheck(this, WordPress);

		// set the environment
		if (fs.existsSync(envFile)) {
			env(envFile);
		}

		this.defaults = {
			docroot: '' };


		this.commands = {
			wp: path.join(cwd, '/bin/wp') };

	}_createClass(WordPress, [{ key: "_getDocRoot", value: function _getDocRoot()

		{

			// dev testing
			console.log(process.env.WP_ROOT);
			if (process.env.NODE_ENV === 'development' && process.env.WP_ROOT) {
				return process.env.WP_ROOT;
			}

			var pathArray = __dirname.split('/');
			var configPath = '';
			pathArray.forEach(function (part, i) {
				var _path = pathArray.join('/');
				var _configPath = path.join(_path, 'wp-config.php');
				if (fs.existsSync(_configPath)) {
					configPath = _path;
					return false;
				}
				pathArray.pop();
			});
			return configPath;
		} }, { key: "init", value: function init(

		options) {
			this.config = _.extend(this.defaults, options);
			var _this = this;

			return new Promise(function (resolve, reject) {
				if (!_this.config.docroot) {
					_this.config.docroot = _this._getDocRoot();

					if (!_this.config.docroot) {
						reject('No doc root give and none found.');
						return;
					}
				}

				// setup commands
				_this.commands.wp += ' --path=' + _this.config.docroot;

				// run methods
				async.parallel([
				function (callback) {
					_this.getSiteInfo(callback);
				},
				function (callback) {
					_this.getServerInfo(callback);
				},
				function (callback) {
					_this.getPluginInfo(callback);
				}],
				function (err, results) {
					if (err) return reject(err);

					// end execution
					var output = _this.formatOutput(results);
					output.site_info.docroot = _this.config.docroot;

					// dev env
					if (process.env.NODE_ENV === 'development' && process.env.WP_URL) {
						output.site_info.siteurl = process.env.WP_URL;;
					}

					// resolve
					resolve(output);
				});
			});
		} }, { key: "runWPCLI", value: function runWPCLI(

		args) {
			var cmd = [this.commands.wp, args].join(' ');

			return new Promise(function (resolve, reject) {
				exec(cmd, function (err, stdout, stderr) {
					if (err) return reject(err);

					resolve(stdout.trim());
				});
			});
		} }, { key: "getSiteInfo", value: function getSiteInfo(

		callback) {
			var keys = ['siteurl', 'blogname', 'admin_email'];
			var _this = this;
			var i = 0;
			var output = {};
			keys.forEach(function (key) {
				_this.runWPCLI('option get ' + key).then(function (data) {
					output[key] = data;
					i++;
					if (i === keys.length) {
						callback(null, {
							site_info: output });

					}
				}, function (err) {
					callback(err);
				});
			});
		} }, { key: "getServerInfo", value: function getServerInfo(

		callback) {
			this.runWPCLI('about').then(function (data) {
				callback(null, {
					server_info: JSON.parse(data) });

			}, function (err) {
				callback(err);
			});
		} }, { key: "getPluginInfo", value: function getPluginInfo(

		callback) {
			this.runWPCLI('plugin list --format=json').then(function (data) {
				callback(null, {
					plugins: JSON.parse(data) });

			}, function (err) {
				callback(err);
			});
		} }, { key: "formatOutput", value: function formatOutput(

		array) {
			var output = {};
			array.forEach(function (object) {
				for (var key in object) {
					output[key] = object[key];
				}
			});
			return output;
		} }]);return WordPress;}();


module.exports = new WordPress();