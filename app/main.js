
"use strict";

const path = require( 'path' );
const utils = require( './utils' );
const _ = require( 'lodash' );
const wordpress = require('./wordpress');
const performance = require('./performance');
const seo = require('./seo');
const brokenLinks = require('./broken-links');
const security = require('./security');
const validateHtml = require('./validate-html');
// const gtmetrixReports = require('./gtmetrix-reports');
const util = require('util');
const async = require("async");

class LaunchChecklist {
	constructor(config) {
		this.init( config );
	}

	init( config ) {

		//Specify module default config here
		const defaults = {
			url : '',
			docroot : '',
		};

		//override config defaults if specified
		this.config = _.extend(defaults, config);
		var _this = this;

		// validateHtml.init({
		// 	url : 'http://staging.riverline.sandbox3.cliquedomains.com/',
		// 	docroot : '/Users/eriknielsen/Sites/riverline-staging.dev',
		// }, function(err, data) {
		// 	if(err) return console.error(err);
		// 	console.log(data);
		// });

		// get site data
		this.getData().then(function(data) {
			_this.data = data;
			_this.config.docroot = data.site_info.docroot;
			_this.config.url = data.site_info.siteurl;

			async.parallel([
				function(callback) {
					performance.init(_this.config, callback);
				},
				function(callback) {
					brokenLinks.init( _this.config, callback );
				},
				function(callback) {
					seo.init( _this.config, callback );
				},
				function(callback) {
					security.init( _this.config, callback );
				},
				function(callback) {
					validateHtml.init( _this.config, callback );
				},
			], function(err, results) {
				if( err ) {
					utils.fail(err);
					return;
				}

				// set data
				_this.data.performance = results[0];
				_this.data.broken_links = results[1];
				_this.data.seo = results[2];
				_this.data.security = results[3];
				_this.data.html = results[4];

				console.log(_this.data);
			});
		}, function(err) {
			utils.fail(err);
		});
	}

	getData() {
		var _this = this;
		return new Promise(function(resolve, reject) {
			wordpress.init( _this.config ).then(function(data) {
				resolve(data);
			}, function(err) {
				reject(err);
			});
		});
	}
}

exports = module.exports = new LaunchChecklist();
