
const path = require( 'path' );
const _ = require( 'lodash' );
// const ping = require('./ping');
const fs = require('fs');
const async = require("async");
const env = require('node-env-file');

// helpers
const utils = require('./utils');
const config = require('./config');

// internal modules
const Info = require('./modules/info');
const Plugins = require('./modules/plugins');
const BrokenLinks = require('./modules/broken-links');
// const wordpress = require('./wordpress');
// const performance = require('./performance');
// const seo = require('./seo');
// const brokenLinks = require('./broken-links');
// const security = require('./security');
// const validateHtml = require('./validate-html');

// models
const site = require('./models/site');

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

		// set listeners
		this.addListeners();
		// console.log(site.toJSON());
		site.set('docroot', opts.docroot);

		// set submodules
		this._tests = {
			// info : info,
			// plugins : plugins,
			'broken-links' : BrokenLinks,
		};
	}

	addListeners() {
		site.once('change:html', (changed) => {
			for(const k in this._tests) {
				const suite = new this._tests[k]();
				suite.run();
			}
		});
		// console.log(Site);
		// events.on('test:complete:site', function(data) {
		// 	console.log(data);
		// });
	}

	run() {
		// const info = this._tests.info;
		// const p = new Promise((resolve) => {
		// 	info.
		// })
		// events.on('data:info', function(_url, html) {
		// 	for(const k in this._tests) {
		// 		const suite = new this._tests[key](options);
		// 		suite.run();
		// 	}
		// });

		const info = new Info();
		const plugins = new Plugins();
		info.run();
		plugins.run();

		return new Promise((resolve, reject) => {
			events.on('tests:complete', results => {
				resolve(results);
			});
		}).catch(function(err) {
			utils.fail(err);
		})
	}

	// run(key, options = {}) {

	// 	let keys = [];

	// 	if( ! key ) {
	// 		keys = Object.keys( this._tests );
	// 	} else if( typeof key === 'string' ) {
	// 		keys = [key];
	// 	}

	// 	keys.forEach((key)=> {
	// 		if( ! this._tests.hasOwnProperty(key) ) {
	// 			return;
	// 		}

	// 		const suite = new this._tests[key](options);
	// 		suite.run();
	// 	});
	// 	// console.log(events.eventNames())

	// 	return new Promise((resolve, reject) => {
	// 		events.on('tests:complete', results => {
	// 			resolve(results);
	// 		});
	// 	}).catch(function(err) {
	// 		utils.fail(err);
	// 	})
	// }
}

exports = module.exports = function(options = {}) {
	return new LaunchChecklist(options);
};
