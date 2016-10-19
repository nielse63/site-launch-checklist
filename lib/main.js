
"use strict";

const path = require( 'path' );
const utils = require( path.resolve( path.join( __dirname, 'utils' ) ) );
const _ = require( 'lodash' );
const wordpress = require('./wordpress');
const performance = require('./performance');
const seo = require('./seo');
const brokenLinks = require('./broken-links');
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
		// brokenLinks.init( {
		// 	url : 'http://staging.riverline.sandbox3.cliquedomains.com/'
		// }, function(err, data) {
		// 	console.log(err, data);
		// } );

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
			], function(err, results) {
				if( err ) {
					console.log(err);
					return;
				}

				// set data
				_this.data.performance = results[0];
				_this.data.broken_links = results[1];
				console.log(_this.data);
			});
		}, function(err) {
			console.error(err);
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
