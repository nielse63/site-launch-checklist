
const path = require( 'path' );
const utils = require( './utils' );
const _ = require( 'lodash' );
const wordpress = require('./wordpress');
const performance = require('./performance');
const seo = require('./seo');
const brokenLinks = require('./broken-links');
const security = require('./security');
const validateHtml = require('./validate-html');
const fs = require('fs');
const util = require('util');
const async = require("async");
const env = require('node-env-file');
var jsonfile = require('jsonfile');

// vars
const cwd = path.dirname( __dirname );
const envFile = path.join( cwd, '/.env' );
const jsonFile = path.join( cwd, '/test/results/data.json' );

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

		// set environment in dev
		if( fs.existsSync( envFile ) ) {
			env( envFile );
			this.config.url = process.env.WP_URL;
			this.config.docroot = process.env.WP_ROOT;
		}

		var _this = this;

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

				jsonfile.writeFile(jsonFile, _this.data, function(err) {
					if( err ) return utils.fail(err);
					utils.success('Data written to test file');
				}, { spaces: 2 });
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
