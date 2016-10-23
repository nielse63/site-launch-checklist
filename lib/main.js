
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

	get testCount() {
		return 6;
	}

	constructor(options = {}) {
		const opts = _.extend(config, options);

		if( ! opts['wp-config'] || opts.docroot === process.env.HOME ) {
			utils.fail('WordPress is not installed or not found. Please specify the directory of the WordPress site you\'d like to test.');
		}

		// set properties
		for(const key in opts) {
			this[key] = opts[key];
		}

		this.results = {};

		// set listeners
		this.addListeners();
		site.set('docroot', opts.docroot);
	}

	addListeners() {
		site.once('change:site', () => {
			// console.log(site.toJSON());
			// if( env && fs.existsSync(envFile) ) {
			// 	env( envFile );
			// 	site.set({
			// 		baseurl : process.env.WP_URL,
			// 		site : {
			// 			siteurl : process.env.WP_URL,
			// 		}
			// 	});
			// }

			new Performance().run();
			new SEO().run();
		});
		site.once('change:html', () => {
			new BrokenLinks().run();
		});

		let completed = this.testCount;
		events.on('suite:complete', suite => {
			if( ! this.results.hasOwnProperty( suite.name ) ) {
				completed--;
			}

			this.results[suite.name] = suite;

			if( ! completed ) {
				console.log('');
				utils.success('='.repeat(50));
				utils.success('All tests complete');
				events.emit('tests:complete', this.results);
			}
		});
	}

	run(callback = () => {}) {
		new Info().run();
		new Plugins().run();
		new Security().run();

		events.on('tests:complete', results => {
			// console.log(results);
			callback(results);
		});
	}
}

exports = module.exports = function(options = {}) {
	return new LaunchChecklist(options);
};
