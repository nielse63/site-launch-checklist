
const path = require( 'path' );
const _ = require( 'lodash' );
const wordpress = require('./wordpress');
const performance = require('./performance');
const seo = require('./seo');
const brokenLinks = require('./broken-links');
const security = require('./security');
const validateHtml = require('./validate-html');
const ping = require('./ping');
const fs = require('fs');
const async = require("async");
const env = require('node-env-file');

// internal modules
const utils = require('./utils');
const config = require('./config');

// vars
const cwd = path.dirname( __dirname );
const envFile = path.join( cwd, '/.env' );

class LaunchChecklist {

	// static get methods
	get wp() {
		return path.resolve(__filename, '..', '..', 'bin', 'wp');
	}

	constructor(options = {}) {
		const opts = _.extend(config.defaults, options);

		if( ! opts['wp-config'] || opts.docroot === process.env.HOME ) {
			utils.fail('WordPress is not installed or not found. Please specify the directory of the WordPress site you\'d like to test.');
		}

		for(const key in opts) {
			this[key] = opts[key];
		}
	}

	// init(config) {

	// 	//Specify module default config here
	// 	const defaults = {
	// 		url : '',
	// 		docroot : '',
	// 	};

	// 	//override config defaults if specified
	// 	this.config = _.extend(defaults, config);

	// 	// set environment in dev
	// 	if( fs.existsSync( envFile ) ) {
	// 		env( envFile );
	// 		this.config.url = process.env.WP_URL;
	// 		this.config.docroot = process.env.WP_ROOT;
	// 	}

	// 	console.log(this.config);
	// 	return;
	// 	// set ping vars and notifiy of start
	// 	ping.setConfig(this.config);
	// 	ping.notify('start');

	// 	var _this = this;


	// 	// get site data
	// 	this.getData().then(function(data) {

	// 		// send data to server
	// 		ping.notify('addsite', {
	// 			url : data.site_info.siteurl,
	// 			name : data.site_info.blogname
	// 		});

	// 		// update object
	// 		_this.data = data;
	// 		_this.config.docroot = data.site_info.docroot;
	// 		_this.config.url = data.site_info.siteurl;

	// 		async.parallel([
	// 			function(callback) {
	// 				utils.info('Beginning performance evaluation');
	// 				performance.init(_this.config, callback);
	// 			},
	// 			function(callback) {
	// 				utils.info('Checking for broken links');
	// 				brokenLinks.init( _this.config, callback );
	// 			},
	// 			function(callback) {
	// 				utils.info('Running SEO tests');
	// 				seo.init( _this.config, callback );
	// 			},
	// 			function(callback) {
	// 				utils.info('Checking site security');
	// 				security.init( _this.config, callback );
	// 			},
	// 			function(callback) {
	// 				utils.info('Validating HTML');
	// 				validateHtml.init( _this.config, callback );
	// 			},
	// 		], function(err, results) {
	// 			if( err ) {
	// 				utils.fail(err);
	// 				return;
	// 			}

	// 			// set data
	// 			_this.data.performance = results[0];
	// 			_this.data.broken_links = results[1];
	// 			_this.data.seo = results[2];
	// 			_this.data.security = results[3];
	// 			_this.data.html = results[4];
	// 			 // submit to server

	// 			// console.log(results);
	// 			ping.submit(_this.data);
	// 			utils.success('done');
	// 			process.exit();
	// 		});
	// 	}, function(err) {
	// 		utils.fail(err);
	// 	});
	// }

	// getData() {
	// 	utils.info('Getting WordPress data');
	// 	const _this = this;
	// 	return new Promise(function(resolve, reject) {
	// 		wordpress.init( _this.config ).then(function(data) {
	// 			resolve(data);
	// 		}, function(err) {
	// 			reject(err);
	// 		});
	// 	});
	// }
}

exports = module.exports = new LaunchChecklist();
