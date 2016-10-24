
"use strict";

// modules
const _ = require( 'lodash' );
const utils = require('./utils');
const config = require('./config');
const Info = require('./modules/info');
const Plugins = require('./modules/plugins');
const BrokenLinks = require('./modules/broken-links');
const Performance = require('./modules/performance');
const SEO = require('./modules/seo');
const Security = require('./modules/security');
const events = require('./events');

// models
const site = require('./models/site');

class LaunchChecklist {

	constructor(options = {}) {
		if( ! options['wp-config'] && options.docroot ) {
			options['wp-config'] = config.getWPConfig( options.docroot );
		}
		const opts = _.extend(config.defaults, options);

		if( ! opts['wp-config'] || opts.docroot === process.env.HOME ) {
			utils.fail('WordPress is not installed or not found. Please specify the directory of the WordPress site you\'d like to test.');
		}

		// set properties
		// this.testCount = 0;
		for(const key in opts) {
			this[key] = opts[key];
		}

		site.set('docroot', opts.docroot);
	}

	addListeners() {
		site.once('change:site', () => {
			new Performance().run();
			new SEO().run();

		});
		site.once('change:html', () => {
			new BrokenLinks().run();
		});

		events.on('suite:complete', suite => {
			this.results[suite.name] = suite;
		});

		process.on('beforeExit', (code) => {
			console.log('');
			utils.success('='.repeat(50));
			utils.success('All tests complete');
			events.emit('tests:complete', this.results);
		});
	}

	run(callback = () => {}) {
		this.results = {};

		// set listeners
		this.addListeners();

		this.getSiteInfo();
		new Plugins().run();
		new Security().run();

		events.on('tests:complete', results => {
			callback(results);
		});
	}

	getSiteInfo() {
		new Info().run();

		return new Promise((resolve, reject) => {
			site.once('change:site', () => {
				resolve( site.toJSON() );
			});
		});
	}
}

exports = module.exports = function(options = {}) {
	return new LaunchChecklist(options);
};
