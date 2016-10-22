
const path = require( 'path' );
const _ = require( 'lodash' );
// const ping = require('./ping');
const fs = require('fs');
const async = require("async");
const env = require('node-env-file');

// internal modules
const utils = require('./utils');
const config = require('./modules/config');
const info = require('./modules/info');
const plugins = require('./modules/plugins');
// const wordpress = require('./wordpress');
const performance = require('./performance');
const seo = require('./seo');
const brokenLinks = require('./broken-links');
const security = require('./security');
const validateHtml = require('./validate-html');

// event listener
const events = require('./events');

// vars
const cwd = path.dirname( __dirname );
const envFile = path.join( cwd, '/.env' );

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

		// set submodules
		this._tests = {
			info : info,
			plugins : plugins,
		};
	}

	run(key, callback = function() {}) {

		let keys = [];

		if( ! key ) {
			// return this.runAll();
			keys = Object.keys( this._tests );
		} else if( typeof key === 'string' ) {
			keys = [key];
		}

		keys.forEach((key)=> {
			if( ! this._tests.hasOwnProperty(key) ) {
				return;
			}

			const suite = new this._tests[key]();
			suite.run();
		});

		return new Promise((resolve, reject) => {
			events.on('tests:complete', results => {
				resolve(results);
			});
		}).catch(function(err) {
			utils.fail(err);
		})
	}
}

exports = module.exports = function(options = {}) {
	return new LaunchChecklist(options);
};
