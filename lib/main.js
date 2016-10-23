
"use strict";

// modules
const path = require( 'path' );
const fs = require( 'fs' );
const _ = require( 'lodash' );
const env = require('node-env-file');

// helpers
const utils = require('./utils');
const config = require('./config');

// internal modules
const Info = require('./modules/info');
const Plugins = require('./modules/plugins');
const BrokenLinks = require('./modules/broken-links');
const Performance = require('./modules/performance');
const SEO = require('./modules/seo');
const Security = require('./modules/security');

// models
const site = require('./models/site');

// event listener
const events = require('./events');

// vars
const envFile = path.join( path.dirname( __dirname ), '/.env' );

class LaunchChecklist {

	constructor(options = {}) {
		const opts = _.extend(config, options);

		if( ! opts['wp-config'] || opts.docroot === process.env.HOME ) {
			utils.fail('WordPress is not installed or not found. Please specify the directory of the WordPress site you\'d like to test.');
		}

		// set properties
		for(const key in opts) {
			this[key] = opts[key];
		}

		// set listeners
		this.addListeners();
		site.set('docroot', opts.docroot);
	}

	addListeners() {
		site.once('change:site', () => {
			if( env && fs.existsSync(envFile) ) {
				env( envFile );
				site.set({
					baseurl : process.env.WP_URL,
					site : {
						siteurl : process.env.WP_URL,
					}
				});
			}

			new Performance().run();
			new SEO().run();
		});
		site.once('change:html', () => {
			new BrokenLinks().run();
		});
	}

	run() {
		new Info().run();
		new Plugins().run();
		new Security().run();

		return new Promise((resolve) => {
			events.on('tests:complete', results => {
				resolve(results);
			});
		}).catch(function(err) {
			utils.fail(err);
		});
	}
}

exports = module.exports = function(options = {}) {
	return new LaunchChecklist(options);
};
