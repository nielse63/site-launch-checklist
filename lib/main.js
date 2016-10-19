'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}
var path = require('path');
var utils = require('./utils');
var _ = require('lodash');
var wordpress = require('./wordpress');
var performance = require('./performance');
var seo = require('./seo');
var brokenLinks = require('./broken-links');
var security = require('./security');
var validateHtml = require('./validate-html');
var fs = require('fs');
var util = require('util');
var async = require("async");
var env = require('node-env-file');
var jsonfile = require('jsonfile');

// vars
var cwd = path.dirname(__dirname);
var envFile = path.join(cwd, '/.env');
var jsonFile = path.join(cwd, '/test/results/data.json');var

LaunchChecklist = function () {
	function LaunchChecklist(config) {_classCallCheck(this, LaunchChecklist);
		this.init(config);
	}_createClass(LaunchChecklist, [{ key: 'init', value: function init(

		config) {

			//Specify module default config here
			var defaults = {
				url: '',
				docroot: '' };


			//override config defaults if specified
			this.config = _.extend(defaults, config);

			// set environment in dev
			if (fs.existsSync(envFile)) {
				env(envFile);
				this.config.url = process.env.WP_URL;
				this.config.docroot = process.env.WP_ROOT;
			}

			var _this = this;

			// get site data
			this.getData().then(function (data) {
				_this.data = data;
				_this.config.docroot = data.site_info.docroot;
				_this.config.url = data.site_info.siteurl;

				async.parallel([
				function (callback) {
					performance.init(_this.config, callback);
				},
				function (callback) {
					brokenLinks.init(_this.config, callback);
				},
				function (callback) {
					seo.init(_this.config, callback);
				},
				function (callback) {
					security.init(_this.config, callback);
				},
				function (callback) {
					validateHtml.init(_this.config, callback);
				}],
				function (err, results) {
					if (err) {
						utils.fail(err);
						return;
					}

					// set data
					_this.data.performance = results[0];
					_this.data.broken_links = results[1];
					_this.data.seo = results[2];
					_this.data.security = results[3];
					_this.data.html = results[4];

					jsonfile.writeFile(jsonFile, _this.data, function (err) {
						if (err) return utils.fail(err);
						utils.success('Data written to test file');
					}, { spaces: 2 });
				});
			}, function (err) {
				utils.fail(err);
			});
		} }, { key: 'getData', value: function getData()

		{
			var _this = this;
			return new Promise(function (resolve, reject) {
				wordpress.init(_this.config).then(function (data) {
					resolve(data);
				}, function (err) {
					reject(err);
				});
			});
		} }]);return LaunchChecklist;}();


exports = module.exports = new LaunchChecklist();